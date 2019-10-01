const crypto = require('crypto');
const rp = require('request-promise');

exports.handler = async (event, context) => {
  const { token, secret } = await getToken();
  
  const redirect = `https://api.twitter.com/oauth/authorize?oauth_token=${token}`
  
  context.succeed({'Location': redirect});
};

const getToken = async () => {
  const consumer_key =  process.env['ConsumerKey'];
  const consumer_secret =  process.env['ConsumerSecret'];
  
  
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
  const token = res.match(/^oauth_token=(\w+?)&/)[1]
  const secret = res.match(/oauth_token_secret=(\w+?)&/)[1]
  const oauth_callback_confirmed = res.match(/oauth_callback_confirmed=(true|false)/)[1]
  
  return { token, secret, oauth_callback_confirmed };
}