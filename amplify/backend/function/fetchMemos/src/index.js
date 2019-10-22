/* Amplify Params - DO NOT EDIT
You can access the following resource attributes as environment variables from your Lambda function
var environment = process.env.ENV
var region = process.env.REGION
var authMemodon3688b20eUserPoolId = process.env.AUTH_MEMODON3688B20E_USERPOOLID
var apiMemodonGraphQLAPIIdOutput = process.env.API_MEMODON_GRAPHQLAPIIDOUTPUT
var apiMemodonGraphQLAPIEndpointOutput = process.env.API_MEMODON_GRAPHQLAPIENDPOINTOUTPUT

Amplify Params - DO NOT EDIT */

const environment = process.env.ENV;
const region = process.env.REGION;
const authMemodon3688b20eUserPoolId =
  process.env.AUTH_MEMODON3688B20E_USERPOOLID;
const apiMemodonGraphQLAPIIdOutput = process.env.API_MEMODON_GRAPHQLAPIIDOUTPUT;
const apiMemodonGraphQLAPIEndpointOutput =
  process.env.API_MEMODON_GRAPHQLAPIENDPOINTOUTPUT;

exports.handler = function(event, context) {
  console.log('environment: ', environment);
  console.log('region: ', region);
  console.log('authMemodon3688b20eUserPoolId: ', authMemodon3688b20eUserPoolId);
  console.log('apiMemodonGraphQLAPIIdOutput: ', apiMemodonGraphQLAPIIdOutput);
  console.log(
    'apiMemodonGraphQLAPIEndpointOutput: ',
    apiMemodonGraphQLAPIEndpointOutput
  );
  console.log('event:', event);
  console.log('cognito-id:', event.requestContext.identity.cognitoIdentityId);

  const response = {
    statusCode: 200,
    body: JSON.stringify({
      hello: 'Hello, World',
    }),
  };
  context.succeed(response); // SUCCESS with message
};
