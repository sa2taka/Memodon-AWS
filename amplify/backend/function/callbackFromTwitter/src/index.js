const AWS = require('aws-sdk');
const rp = require('request-promise');
const qs = require('querystring');
const URL = require('url').URL;
const AWSAppSyncClient = require('aws-appsync').default;
const gql = require('graphql-tag');
require('isomorphic-fetch');

AWS.config.update({ region: 'ap-northeast-1' });

const ddb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });
const ci = new AWS.CognitoIdentity({ apiVersion: '2014-06-30' });

const region = process.env.REGION;
const GraphQLEndpoint = process.env.API_MEMODON_GRAPHQLAPIENDPOINTOUTPUT;

exports.handler = async (event, context) => {
  const oauthToken = event.queryStringParameters.oauth_token;
  const oauthVerifier = event.queryStringParameters.oauth_verifier;

  const sessionId = parseSessionId(
    event.headers.Cookie || event.headers.cookie
  );
  const sessionData = await pullSessionData(sessionId);

  let origin = '';

  if (process.env['ENV'] !== 'prod' && event.headers) {
    origin =
      sessionData.Item.origin.S || process.env['DEFAULT_CALLBACK_ORIGIN'];
  } else {
    origin = process.env['DEFAULT_CALLBACK_ORIGIN'];
  }

  const callbackPath = origin + process.env.CALLBACK_PATH;

  const oauthSecret = sessionData.Item.tokenSecret.S;
  const dateToDelete = sessionData.Item.dateToDelete.N;

  if (!oauthToken || !oauthVerifier) {
    // FIXME This is against the DRY.
    const data = { result: 'error', reason: 'invalid_access' };

    const response = {
      statusCode: 302,
      headers: {
        Location: `${callbackPath}&${qs.stringify(data)}`,
        'Access-Control-Allow-Origin': '*',
        'Set-Cookie': 'sessionId=deleted; Max-Age=-1',
      },
    };
    context.succeed(response);
    return;
  }

  if (dateToDelete - Math.floor(Date.now() / 1000) < 0) {
    // FIXME This is against the DRY.
    const data = { result: 'error', reason: 'session_timeout' };

    const response = {
      statusCode: 302,
      headers: {
        Location: `${callbackPath}&${qs.stringify(data)}`,
        'Access-Control-Allow-Origin': '*',
        'Set-Cookie': 'sessionId=deleted; Max-Age=-1',
      },
    };

    context.succeed(response);
    return;
  }

  const { token, secret, userId, screenName } = await getAccessToken(
    oauthToken,
    oauthSecret,
    oauthVerifier
  ).catch((err) => {
    console.log('Error', err, err.stack);
    // FIXME This is against the DRY.
    const data = { result: 'error', reason: 'auth_error' };

    const response = {
      statusCode: 302,
      headers: {
        Location: `${callbackPath}&${qs.stringify(data)}`,
        'Access-Control-Allow-Origin': '*',
        'Set-Cookie': 'sessionId=deleted; Max-Age=-1',
      },
    };

    context.succeed(response);
    return;
  });

  const cognito_id_promise = createId(token, secret);
  const twitter_info_promise = getTwitterUserInfo(token, secret);

  const data = await Promise.all([cognito_id_promise, twitter_info_promise])
    .then((values) => {
      const { IdentityId } = values[0];
      const { name, screen_name, profile_image_url_https } = values[1];

      return saveUser({
        cognitoId: IdentityId,
        ownerId: userId,
        name,
        screenName,
        iconUrl: profile_image_url_https,
        token,
        secret,
      });
    })
    .then((data) => {
      return { result: 'success', data };
    })
    .catch((err) => {
      console.log('Error', err, err.stack);
      return { result: 'error', reason: 'auth_error' };
    });

  const response = {
    statusCode: 302,
    headers: {
      Location: `${callbackPath}&${qs.stringify(data)}`,
      'Access-Control-Allow-Origin': '*',
      'Set-Cookie': 'sessionId=deleted; Max-Age=-1',
    },
  };

  context.succeed(response);
};

const parseSessionId = (cookie) => {
  return cookie.match('sessionId=([^;]+)')[1];
};

const pullSessionData = async (sessionId) => {
  const params = {
    TableName: process.env['STORAGE_SESSION_NAME'],
    Key: {
      sessionId: {
        S: sessionId,
      },
    },
  };

  return await ddb
    .getItem(params)
    .promise()
    .catch((err) => {
      console.log('Error', err);
      throw 'session_is_missing';
    });
};

const getAccessToken = async (token, token_secret, verifier) => {
  const consumer_key = process.env['TWITTER_API_KEY'];
  const consumer_secret = process.env['TWITTER_API_SECRET'];

  const url = 'https://api.twitter.com/oauth/access_token';
  const method = 'POST';

  const res = await rp({
    method,
    uri: url,
    timeout: 10 * 1000,
    oauth: {
      consumer_key,
      consumer_secret,
      token,
      token_secret,
      verifier,
    },
  }).catch((error) => {
    console.log(error);
    throw 'auth_error';
  });

  return parseAuthRes(res);
};

const parseAuthRes = (res) => {
  const data = qs.parse(res);

  return {
    token: data.oauth_token,
    secret: data.oauth_token_secret,
    userId: data.user_id,
    screenName: data.screen_name,
  };
};

const createId = (token, secret) => {
  const params = {
    IdentityPoolId: process.env['AUTH_MEMODON_IDENTITYPOOLID'],
    Logins: {
      'api.twitter.com': `${token};${secret}`,
    },
  };

  return ci
    .getId(params)
    .promise()
    .catch((err) => {
      console.log('Error', err, err.stack);
      throw 'id_pool_error';
    });
};

const getTwitterUserInfo = (token, token_secret) => {
  const consumer_key = process.env['TWITTER_API_KEY'];
  const consumer_secret = process.env['TWITTER_API_SECRET'];

  const url = 'https://api.twitter.com/1.1/account/verify_credentials.json';
  const method = 'GET';

  return rp({
    method,
    uri: url,
    timeout: 10 * 1000,
    oauth: {
      consumer_key,
      consumer_secret,
      token,
      token_secret,
    },
    json: true,
  });
};

const saveUser = (data) => {
  return appsyncClient
    .query({
      query: gql(getUser),
      variables: { id: data.cognitoId },
    })
    .then((user) => {
      if (user.data.getUser) {
        return user.data.getUser;
      }

      return appsyncClient.mutate({
        mutation: gql(createUser),
        variables: {
          input: {
            id: data.cognitoId,
            twitterId: data.ownerId,
            userName: data.screenName,
            displayName: data.name,
            iconUrl: data.iconUrl,
            OAuthToken: data.token,
            OAuthSecret: data.secret,
          },
        },
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

const appsyncClient = new AWSAppSyncClient({
  url: GraphQLEndpoint,
  region: region,
  auth: {
    type: 'AWS_IAM',
    credentials: () => AWS.config.credentials,
  },
  disableOffline: true,
});

// graphQL queries

const getUser = `query GetUser($id: ID!) {
  getUser(id: $id) {
    id
    twitterId
    userName
    displayName
    iconUrl
    isPrivate
    note {
      items {
        id
        statusId
        createdAt
      }
      nextToken
    }
    subUser {
      items {
        id
        userName
        displayName
        iconUrl
      }
      nextToken
    }
  }
}
`;

const createUser = `mutation CreateUser($input: CreateUserInput!) {
  createUser(input: $input) {
    id
    twitterId
    userName
    displayName
    iconUrl
    isPrivate
    OAuthToken
    OAuthSecret
    note {
      items {
        id
        statusId
        createdAt
      }
      nextToken
    }
    subUser {
      items {
        id
        userName
        displayName
        iconUrl
      }
      nextToken
    }
  }
}
`;
