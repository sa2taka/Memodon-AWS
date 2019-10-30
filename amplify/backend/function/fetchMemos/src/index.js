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
      hello: 'Hello, World',
    }),
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  };
  context.succeed(response); // SUCCESS with message
};

const fetchTwitterMemos = async(cognitoId) => {
  await getTwitterUserIds(cognitoId);
};

const getTwitterUserIds = async(cognitoId) => {
  const user = await appsyncClient.query({
    query: gql(getUser),
    variables: { id: cognitoId },
  });

  return user.twitterId;
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

// graphql queries

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
