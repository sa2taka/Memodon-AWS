const AWS = require('aws-sdk');
const rp = require('request-promise');
const qs = require('querystring');
const URL = require('url').URL;
let isDevEnv = undefined;

AWS.config.update({ region: 'ap-northeast-1' });

const ddb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });
const ci = new AWS.CognitoIdentity({ apiVersion: '2014-06-30' });

exports.handler = async (event, context) => {
  const origin = getOrigin(event.referer);
  const oauthToken = event.oauth_token;
  const oauthVerifier = event.oauth_verifier;

  const sessionId = parseSessionId(event.Cookie);
  const sessionData = await pullSessionData(sessionId);

  const oauthSecret = sessionData.Item.tokenSecret.S;
  const dateToDelete = sessionData.Item.dateToDelete.N;

  isDevEnv = decideDevEnv(origin);

  if (dateToDelete - Math.floor(Date.now() / 1000) < 0) {
    throw 'session_is_expired';
  }

  const { token, secret, userId, screenName } = await getAccessToken(
    oauthToken,
    oauthSecret,
    oauthVerifier
  );

  const cognito_id_promise = createId(token, secret);
  const twitter_info_promise = getTwitterUserInfo(token, secret);

  const data = await Promise.all([cognito_id_promise, twitter_info_promise])
    .then((values) => {
      const { IdentityId } = values[0];
      const { name, screen_name, profile_image_url_https } = values[1];

      return Promise.resolve({
        cognitoId: IdentityId,
        ownerId: userId,
        name,
        screenName,
        iconUrl: profile_image_url_https,
        token,
        secret,
      });
    })
    .catch((err) => {
      console.log('Error', err, err.stack);
      throw 'register_error';
    });

  context.succeed({
    data,
    Cookie: 'sessionId=deleted; Max-Age=-1',
    origin,
  });
};

const parseSessionId = (cookie) => {
  return cookie.match('sessionId=([^;]+)')[1];
};

const pullSessionData = async (sessionId) => {
  const params = {
    TableName: 'Session',
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
  const consumer_key = process.env['ConsumerKey'];
  const consumer_secret = process.env['ConsumerSecret'];

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
    IdentityPoolId: isDevEnv
      ? process.env['DevIdentityPoolId']
      : process.env['ProdIdentityPoolId'],
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
  const consumer_key = process.env['ConsumerKey'];
  const consumer_secret = process.env['ConsumerSecret'];

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

const getOrigin = (referer) => {
  if (!referer || referer === '') {
    return process.env['defaultCallbackOrigin'];
  }
  return new URL(referer).origin;
};

const decideDevEnv = (origin) => {
  if (origin === process.env['productionOrigin']) {
    return false;
  } else {
    return true;
  }
};
