import wrapper from '../libs/fetchWrapper';
import SigninData from '../types/singinData';
import { API, Auth, graphqlOperation, Logger } from 'aws-amplify';
import User, { UserState } from '@/store/modules/user';
import { SigninEndPoint } from '@/libs/globalConstVariables';
import { GRAPHQL_AUTH_MODE, GraphQLResult } from '@aws-amplify/api/lib/types';
import { UserData } from 'aws-sdk/clients/sms';
import * as Queries from '@/graphql/queries';
import * as Mutations from '@/graphql/mutations';

let reason: 'timeout' | 'auth_error' | 'invalid_access' | 'already_singed' =
  'auth_error';

const signinWithTwitter = async (
  preToken: string | Array<string | null>,
  verifier: string | Array<string | null>
) => {
  // Catch return null because throw error if have not authenticated
  const existedUser = await Auth.currentAuthenticatedUser().catch((e) => null);

  if (existedUser) {
    reason = 'already_singed';
    return Promise.reject(reason);
  }

  if (typeof preToken === 'string' && typeof verifier === 'string') {
    return signinAlongFlow(preToken, verifier);
  } else {
    reason = 'invalid_access';
    return Promise.reject(reason);
  }
};

export default signinWithTwitter;

const signinAlongFlow = (preToken: string, verifier: string) => {
  let twitterIdInfo: string;
  let displayNameInfo: string;
  let iconUrlInfo: string;
  let tokenInfo: string;
  let secretInfo: string;

  return getToken(preToken, verifier)
    .then((response) => {
      const {
        id,
        ownerId,
        name,
        screenName,
        iconUrl,
        token,
        secret,
      } = response.data;

      twitterIdInfo = ownerId;
      displayNameInfo = name;
      iconUrlInfo = iconUrl;
      tokenInfo = token;
      secretInfo = secret;

      return signin(token, secret, id, ownerId, screenName);
    })
    .then((cred) => {
      return Auth.currentAuthenticatedUser();
    })
    .then(async (user) => {
      const existedUser = (await getUser(user.id)) as {
        data: {
          getUser: UserState;
        };
      };

      if (existedUser.data.getUser) {
        return existedUser.data.getUser;
      }

      const createdUser = (await pushUserToDatabase(
        user,
        twitterIdInfo,
        displayNameInfo,
        iconUrlInfo,
        tokenInfo,
        secretInfo
      )) as {
        data: {
          createUser: UserState;
        };
      };

      return createdUser.data.createUser;
    })
    .then(async (userInfo) => {
      return setUserInfoToState(userInfo);
    })
    .catch((e) => {
      reason = 'auth_error';
      User.signOut();
      return Promise.reject(reason);
    });
};

const getToken = (
  oauthToken: string,
  oauthVerifier: string
): Promise<SigninData> => {
  const url = SigninEndPoint;
  const body = JSON.stringify({
    oauth_token: oauthToken,
    oauth_verifier: oauthVerifier,
  });
  const headers = { 'Content-Type': 'application/json' };
  const postInit: RequestInit = {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'include',
    headers,
    body,
  };

  return wrapper<SigninData>(fetch(url, postInit));
};

const signin = (
  token: string,
  secret: string,
  id: string,
  twitterId: string,
  screenName: string
) => {
  const domain = 'api.twitter.com';
  const user = { name: screenName };

  return Auth.federatedSignIn(
    domain,
    {
      token: `${token};${secret}`,
      identity_id: id,
      expires_at: 30 * 24 * 60 * 60 * 1000 + Date.now(),
    },
    user
  );
};

const getUser = (id: string) => {
  return API.graphql({
    query: Queries.getUser,
    variables: { id },
  });
};

const pushUserToDatabase = (
  credentials: { id: string; name: string },
  twitterId: string,
  displayName: string,
  iconUrl: string,
  OAtuhToken: string,
  OAuthSecret: string
) => {
  const userInfo = {
    id: credentials.id,
    twitterId,
    userName: credentials.name,
    displayName,
    iconUrl,
    OAtuhToken,
    OAuthSecret,
  };

  return API.graphql({
    query: Mutations.createUser,
    variables: { input: userInfo },
    authMode: GRAPHQL_AUTH_MODE.AWS_IAM,
  });
};

const setUserInfoToState = (data: UserState) => {
  return User.setUser(data);
};
