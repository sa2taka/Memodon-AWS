/* Amplify Params - DO NOT EDIT
You can access the following resource attributes as environment variables from your Lambda function
var environment = process.env.ENV
var region = process.env.REGION
var authMemodon3688b20eUserPoolId = process.env.AUTH_MEMODON3688B20E_USERPOOLID
var apiMemodonGraphQLAPIIdOutput = process.env.API_MEMODON_GRAPHQLAPIIDOUTPUT
var apiMemodonGraphQLAPIEndpointOutput = process.env.API_MEMODON_GRAPHQLAPIENDPOINTOUTPUT

Amplify Params - DO NOT EDIT */

const aws = require('aws-sdk');
const AWSAppSyncClient = require('aws-appsync').default;
const gql = require('graphql-tag');
const rp = require('request-promise');
require('isomorphic-fetch');

const environment = process.env.ENV;
const region = process.env.REGION;
const authMemodon3688b20eUserPoolId =
  process.env.AUTH_MEMODON3688B20E_USERPOOLID;
const apiMemodonGraphQLAPIIdOutput = process.env.API_MEMODON_GRAPHQLAPIIDOUTPUT;
const apiMemodonGraphQLAPIEndpointOutput =
  process.env.API_MEMODON_GRAPHQLAPIENDPOINTOUTPUT;
const twitterAPIUserTimelineEndpoint =
  'https://api.twitter.com/1.1/statuses/user_timeline.json';

exports.handler = async function(event, context) {
  await fetchTwitterMemos(event.requestContext.identity.cognitoIdentityId);

  const response = {
    statusCode: 200,
    body: JSON.stringify({
      hello: 'success',
    }),
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  };
  context.succeed(response); // SUCCESS with message
};

const fetchTwitterMemos = (cognitoId) => {
  return getTwitterUserInfo(cognitoId).then(({ id, token, secret }) => {
    return crawlAndFilterTimeline(id, token, secret);
  });
};

const crawlAndFilterTimeline = async (user_id, token, secret) => {
  let memos = [];
  let max_id = null;
  const count = 200;
  while (true) {
    let data = {
      user_id,
      count,
    };

    if (max_id) {
      data.max_id = max_id;
    }

    const timeline = await get(
      twitterAPIUserTimelineEndpoint,
      token,
      secret,
      data
    );

    max_id = timeline[timeline.length - 1]
      ? timeline[timeline.length - 1].id
      : max_id;

    memos = memos.concat(
      timeline.filter((tweet) => {
        return (
          tweet.text.includes('#メモ') ||
          tweet.text.toLowerCase().includes('#memo')
        );
      })
    );
    if (timeline.length < 10) {
      break;
    }

    await sleep(1500);
  }
  console.log(memos);
  return memos;
};

const getTwitterUserInfo = (cognitoId) => {
  return appsyncClient
    .query({
      query: gql(getUser),
      variables: { id: cognitoId },
    })
    .then((user) => {
      return {
        id: user.data.getUser.twitterId,
        token: user.data.getUser.OAuthToken,
        secret: user.data.getUser.OAuthSecret,
      };
    });
};

const get = (url, token, token_secret, qs) => {
  const consumer_key = process.env.TWITTER_API_KEY;
  const consumer_secret = process.env.TWITTER_API_SECRET;
  return rp({
    method: 'GET',
    uri: url,
    timeout: 30 * 1000,
    oauth: {
      consumer_key,
      consumer_secret,
      token,
      token_secret,
    },
    json: true,
    qs,
  }).catch((error) => {
    console.error(error);
    throw error;
  });
};

const appsyncClient = new AWSAppSyncClient({
  url: apiMemodonGraphQLAPIEndpointOutput,
  region: region,
  auth: {
    type: 'AWS_IAM',
    credentials: () => aws.config.credentials,
  },
  disableOffline: true,
});

const sleep = async (t) => {
  return await new Promise((r) => {
    setTimeout(() => {
      r();
    }, t);
  });
};

// graphql queries

const getUser = `query GetUser($id: ID!) {
  getUser(id: $id) {
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

const createMemo = `mutation CreateMemo($input: CreateMemoInput!) {
  createMemo(input: $input) {
    id
    statusId
    user {
      id
      twitterId
      userName
      displayName
      iconUrl
      isPrivate
      note {
        nextToken
      }
      subUser {
        nextToken
      }
    }
    tags {
      items {
        id
      }
      nextToken
    }
    createdAt
  }
}
`;
