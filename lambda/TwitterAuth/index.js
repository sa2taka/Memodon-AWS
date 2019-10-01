const crypto = require('crypto');
const OAuth = require('oauth-1.0a');
const rp = require('request-promise');

exports.handler = async (event, context) => {
  const { token, secret } = await getToken();
  
  const redirect = `https://api.twitter.com/oauth/authorize?oauth_token=${token}`
  
  context.succeed({'Location': redirect});
};

const getToken = async () => {
    const consumer = {
    key: process.env['ConsumerKey'],
    secret: process.env['ConsumerSecret']
  };
  const oauth = OAuth({
    consumer,
    signature_method: 'HMAC-SHA1',
    hash_function(base_string, key) {
    return crypto
        .createHmac('sha1', key)
        .update(base_string)
        .digest('base64')
    },
  });
  
  
  const url = 'https://api.twitter.com/oauth/request_token';
  const method = 'POST';
  const oauth_callback = process.env['CallbackURL'];
  
  const request_data = {
    url,
    method,
    data: {
      oauth_callback
    }
  };
  
  const res = await rp({
    method,
    uri: url,
    timeout: 10 * 1000,
    form: {
      oauth_callback
    },
    headers: oauth.toHeader(oauth.authorize(request_data))
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
  const token = res.match(/^oauth_token=(\w+?)&/)[1]
  const secret = res.match(/oauth_token_secret=(\w+?)&/)[1]
  const oauth_callback_confirmed = res.match(/oauth_callback_confirmed=(true|false)/)[1]
  
  return { token, secret, oauth_callback_confirmed };
}