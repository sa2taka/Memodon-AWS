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
  // This method name is 'getToken', but it save or update user in backend.
  return getToken(preToken, verifier)
    .then((response) => {
      if (response.result === 'error') {
        throw response.reason;
      }
      const { token, secret, twitterId, userName } = response.data;

      return signin(token, secret, twitterId, userName);
    })
    .catch((e) => {
      reason = e;
      User.signOut();
      return Promise.reject(reason);
    })
    .then((cred) => {
      return Auth.currentAuthenticatedUser();
    })
    .then((user) => {
      return getUser(user.id) as Promise<{
        data: {
          getUser: UserState;
        };
      }>;
    })
    .then(async (userInfo) => {
      return setUserInfoToState(userInfo.data.getUser);
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
  const endpoint = SigninEndPoint;
  const query = `oauth_token=${oauthToken}&oauth_verifier=${oauthVerifier}`;

  return wrapper<SigninData>(
    fetch(`${endpoint}?${query}`, {
      mode: 'cors',
      credentials: 'include',
    })
  );
};

const signin = (
  token: string,
  secret: string,
  twitterId: string,
  userName: string
) => {
  const domain = 'api.twitter.com';
  const user = { name: userName };

  return Auth.federatedSignIn(
    domain,
    {
      token: `${token};${secret}`,
      identity_id: twitterId,
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
