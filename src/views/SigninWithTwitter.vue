<template>
  <div class="center">
    <loading :isComplete="isComplete"></loading>
    Singing in...
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { API, Auth, graphqlOperation, Logger } from 'aws-amplify';
import * as Queries from '@/graphql/queries';
import * as Mutations from '@/graphql/mutations';
import User, { UserState } from '@/store/modules/user';

import wrapper from '../libs/fetchWrapper';
import SigninData from '../types/singinData';

import Loading from '@/components/Atomic/Loading.vue';

import { GRAPHQL_AUTH_MODE, GraphQLResult } from '@aws-amplify/api/lib/types';
import { UserData } from 'aws-sdk/clients/sms';
// It singin with twitter and close window.
@Component({
  components: {
    Loading,
  },
})
export default class SinginWithTwitter extends Vue {
  private isComplete = false;

  public created() {
    const preToken = this.$route.query.oauth_token;
    const verifier = this.$route.query.oauth_verifier;

    let twitterIdInfo: string;
    let displayNameInfo: string;
    let iconUrlInfo: string;

    setTimeout(() => {
      this.isComplete = true;
    }, 2000);

    if (typeof preToken === 'string' && typeof verifier === 'string') {
      this.getToken(preToken, verifier)
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
          displayNameInfo = screenName;
          iconUrlInfo = iconUrl;

          // To eliminate token and verifier
          this.$router.replace('/signin/twitter');

          return this.signin(token, secret, id, ownerId, screenName);
        })
        .then((cred) => {
          return Auth.currentAuthenticatedUser();
        })
        .then(async (user) => {
          const existedUser = await this.getUser(user.id) as {
            data: {
              getUser: UserState,
            }
          };

          if (existedUser.data.getUser) {
            return existedUser.data.getUser;
          }

          const createdUser = await this.pushUserToDatabase(
            user,
            twitterIdInfo,
            displayNameInfo,
            iconUrlInfo
          )  as {
            data: {
              createUser: UserState,
            }
          };

          return createdUser.data.createUser;
        })
        .then(async (userInfo) => {
          return this.setUserInfoToState(userInfo);
        })
        .then((data) => {
          // this.$router.push('/');
        })
        .catch((e) => {
          // this.$router.push('/');
        });
    }
  }

  private getToken(
    oauthToken: string,
    oauthVerifier: string
  ): Promise<SigninData> {
    const url = 'https://api.memodon.com/v1/twitter/signin';
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
  }

  private signin(
    token: string,
    secret: string,
    id: string,
    twitterId: string,
    screenName: string
  ) {
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
  }

  private getUser(id: string) {
    return API.graphql({
      query: Queries.getUser,
      variables: { id },
    });
  }

  private pushUserToDatabase(
    credentials: { id: string; name: string },
    twitterId: string,
    displayName: string,
    iconUrl: string
  ) {
    const userInfo = {
      id: credentials.id,
      twitterId,
      userName: credentials.name,
      displayName,
      iconUrl,
    };

    return API.graphql({
      query: Mutations.createUser,
      variables: { input: userInfo },
      authMode: GRAPHQL_AUTH_MODE.AWS_IAM,
    });
  }

  private setUserInfoToState(data: UserState) {
    return User.setUser(data);
  }
}
</script>
