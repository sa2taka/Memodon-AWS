const crypto = require('crypto');
const rp = require('request-promise');
const AWS = require('aws-sdk');
const qs = require('querystring');
const URL = require('url').URL;

AWS.config.update({ region: 'ap-northeast-1' });

const ddb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });

exports.handler = async (event, context) => {
  let origin = '';

  if (process.env['ENV'] !== 'prod' && event.headers) {
    origin = getOrigin(event.headers.referer || event.headers.Referer);
  } else {
    origin = process.env['DEFAULT_CALLBACK_ORIGIN'];
  }

  const { token, secret } = await getToken(origin);

  const sessionId = await putToDynamo(secret, origin);
  const setCookieSentence = generateSetCookieSentence(sessionId);

  const redirect = `https://api.twitter.com/oauth/authorize?oauth_token=${token}`;
  const response = {
    statusCode: 302,
    body: '',
    headers: {
      'Access-Control-Allow-Origin': '*',
      Location: redirect,
      'Set-Cookie': setCookieSentence,
    },
  };

  // Cookie is mapped to Set-Cookie header
  context.succeed(response);
};

const getToken = async (origin) => {
  const consumer_key = process.env['TWITTER_API_KEY'];
  const consumer_secret = process.env['TWITTER_API_SECRET'];

  const url = 'https://api.twitter.com/oauth/request_token';
  const method = 'POST';
  const callback = process.env['CALLBACK_PATH'];

  const res = await rp({
    method,
    uri: url,
    timeout: 10 * 1000,
    form: {
      oauth_callback: callback,
    },
    oauth: {
      consumer_key,
      consumer_secret,
    },
  }).catch((error) => {
    console.log(error);
  });

  const { token, secret, oauth_callback_confirmed } = parseAuthRes(res);
  if (!oauth_callback_confirmed) {
    throw 'oatuh_callback_confirmed is not true';
  }

  return { token, secret };
};

const parseAuthRes = (res) => {
  const data = qs.parse(res);

  return {
    token: data.oauth_token,
    secret: data.oauth_token_secret,
    oauth_callback_confirmed: data.oauth_token_secret,
  };
};

const putToDynamo = async (secret, origin) => {
  const sessionId = crypto.randomBytes(16).toString('hex');
  const dateToDelete =
    Math.floor(Date.now() / 1000) + process.env['DATE_TO_DELETE'] * 60;
  const params = {
    TableName: process.env['STORAGE_SESSION_NAME'],
    Item: {
      sessionId: {
        S: sessionId,
      },
      tokenSecret: {
        S: secret,
      },
      dateToDelete: {
        N: dateToDelete.toString(),
      },
      origin: {
        S: origin,
      },
    },
  };

  await ddb
    .putItem(params)
    .promise()
    .then((data) => {
      console.log('Success: ', data);
    })
    .catch((err) => {
      console.log('Error: ', err);
      throw err;
    });

  return sessionId;
};

const generateSetCookieSentence = (sessionId) => {
  return `sessionId=${sessionId}; Secure; HttpOnly; Path=/; Max-Age=300`;
};

const getOrigin = (referer) => {
  if (!referer || referer === '') {
    return process.env['DEFAULT_CALLBACK_ORIGIN'];
  }
  return new URL(referer).origin;
};
