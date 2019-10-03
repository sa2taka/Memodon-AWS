const crypto = require('crypto');
const rp = require('request-promise');
const AWS = require('aws-sdk');

AWS.config.update({region: 'ap-northeast-1'});

const ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

exports.handler = async (event, context) => {
  const { token, secret } = await getToken();
  
  const sessionId = await putToDynamo(secret);
  const set_cookie_sentence = generateSetCookieSentence(sessionId);
  
  const redirect = `https://api.twitter.com/oauth/authorize?oauth_token=${token}`
  // Cookie is mapped to Set-Cookie header
  context.succeed({
    'Location': redirect, 
    'Cookie': sessionId,
  });
};

const getToken = async () => {
  const consumer_key =  process.env['ConsumerKey'];
  const consumer_secret =  process.env['ConsumerSecret'];
  
  
  const url = 'https://api.twitter.com/oauth/request_token';
  const method = 'POST';
  const oauth_callback = process.env['CallbackURL'];
  
  const res = await rp({
    method,
    uri: url,
    timeout: 10 * 1000,
    form: {
      oauth_callback
    },
    oauth: {
      consumer_key,
      consumer_secret
    }
  })
  .catch(error => {
    console.log(error);
  });
  
  const { token, secret, oauth_callback_confirmed } = parseAuthRes(res);
  if (!oauth_callback_confirmed) {
    throw 'oatuh_callback_confirmed is not true';
  }
  
  return { token, secret };
}

const parseAuthRes = (res) => {
  const token = res.match(/^oauth_token=([^&]+?)&/)[1]
  const secret = res.match(/oauth_token_secret=([^&]+?)&/)[1]
  const oauth_callback_confirmed = res.match(/oauth_callback_confirmed=(true|false)/)[1]
  
  return { token, secret, oauth_callback_confirmed };
}

const putToDynamo = async (secret) => {
  const sessionId = crypto.randomBytes(16).toString('hex');
  const dateToDelete = Math.floor(Date.now() / 1000) + process.env['TimeToDelete'] * 6;
  const params = {
    TableName: 'Session',
    Item: {
      sessionId: {
        S: sessionId,
      },
      token_secret: {
        S: secret,  
      },
      dateToDelete: {
        N: dateToDelete.toString(),
      },
    },
  };

  await ddb.putItem(params).promise()
  .then((data) => {
    console.log('Success: ', data);
  })
  .catch((err) => {
    console.log('Error: ', err);
    throw err;
  });
  
  return sessionId;
}

const generateSetCookieSentence = (sessionId) => {
  return `sessionId=${sessionId}; Secure; HttpOnly; Path=/; Max-Age=300`
}