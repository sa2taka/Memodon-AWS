const AWS = require('aws-sdk');
const rp = require('request-promise');
const qs = require('querystring');
const URL = require('url').URL;

AWS.config.update({region: 'ap-northeast-1'});

const ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});
const ci = new AWS.CognitoIdentity({apiVersion: '2014-06-30'});

exports.handler = async (event, context) => {
  const origin = getOrigin(event.referer);
  const oauth_token = event.oauth_token;
  const oauth_verifier = event.oauth_verifier;
  
  const sessionId = parseSessionId(event.Cookie);
  const sessionData = await pullSessionData(sessionId);
  
  const oauth_secret = sessionData.Item.tokenSecret.S;
  const dateToDelete = sessionData.Item.dateToDelete.N;

  if (dateToDelete - Math.floor(Date.now() / 1000) < 0) {
    throw 'session_is_expired';
  }
  
  const { token, secret, userId, screenName } = await getAccessToken(oauth_token, oauth_secret, oauth_verifier);
  const cognito_id_promise = createId(token, secret);
  const twitter_info_promise = getTwitterUserInfo(token, secret);
  
  const data = await Promise.all([cognito_id_promise, twitter_info_promise])
                      .then((values) => {
                        const { IdentityId } = values[0];
                        const { name, screen_name, profile_image_url_https } = values[1];
                        
                        return pushTwitterInfo(IdentityId, userId, name, screenName, profile_image_url_https, token, secret);
                      })
                      .catch((err) => {
                        console.log('Error', err, err.stack);
                        throw 'register_error';
                      })
                
  context.succeed({ 
    data, 
    Cookie: 'sessionId=deleted; Max-Age=-1',
  });
};

const parseSessionId = (cookie) => {
  return cookie.match('sessionId=([^;]+)')[1];
}

const pullSessionData = async (sessionId) => {
  const params = {
    TableName: 'Session',
    Key: {
      sessionId: {
        S: sessionId,
      },
    },
  };
  
  return await ddb.getItem(params).promise()
                  .catch((err) => {
                    console.log('Error', err);
                    throw 'session_is_missing';
                  })
}

const getAccessToken = async (token, token_secret, verifier) => {
  const consumer_key =  process.env['ConsumerKey'];
  const consumer_secret =  process.env['ConsumerSecret'];
  
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
    }
  })
  .catch(error => {
    console.log(error);
    throw 'auth_error';
  });
  
  return parseAuthRes(res);
}

const parseAuthRes = (res) => {
  const data = qs.parse(res);
  
  return { 
    token: data.oauth_token, 
    secret: data.oauth_token_secret, 
    userId: data.user_id, 
    screenName: data.screen_name,
  };
}

const createId = (token, secret) => {
  const params = {
    IdentityPoolId: process.env['IdentityPoolId'],
    Logins: {
     'api.twitter.com': `${token};${secret}`,
    },
  };
  
  return ci.getId(params).promise()
          .catch((err) => {
            console.log('Error', err, err.stack);
            throw 'id_pool_error'
          });
}

const getTwitterUserInfo = (token, token_secret) => {
  const consumer_key =  process.env['ConsumerKey'];
  const consumer_secret =  process.env['ConsumerSecret'];
  
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
  })
}

const pushTwitterInfo = (id, twitterId, name, screenName, iconUrl, token, secret) => {
  return ddb.getItem({
    TableName: 'MemodonUser',
    Key: {
      id: {
        S: id,
      },
      userId: {
        S: twitterId.toString(),
      }
    }
  })
  .promise()
  .then(data => {
    if (Object.keys(data).length !== 0) {
      return Promise.resolve({ id, twitterId, name, screenName, iconUrl, token, secret });
    }
    
    const params = {
      TableName: 'MemodonUser',
      Item: {
        cognitoId: {
          S: id,
        },
        dataType: {
          S: 'owner',
        },
        userId: {
          S: 'twitter_' + twitterId.toString(),
        },
        name: {
          S: name,
        },
        userName: {
          S: screenName,
        },
        iconUrl: {
          S: iconUrl,
        },
        token: {
          S: token,
        },
        secret: {
          S: secret,
        }
      }
    };
    return ddb.putItem(params).promise();
  })
  .then(data => {
    return { id, twitterId, name, screenName, iconUrl, token, secret };  
  });
}

const getOrigin = (referer) => {
  if (!referer || referer === '') {
    return process.env['defaultCallbackOrigin'];
  }
  return new URL(referer).origin;
}