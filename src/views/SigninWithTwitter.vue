<template>
  <div class="center">Singing in...</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Auth, Logger } from 'aws-amplify';

import wrapper from '../libs/fetchWrapper';
import SigninData from '../types/singinData';

import MainTitle from '@/components/Home/MainTitle.vue';
// It singin with twitter and close window.
@Component
export default class SinginWithTwitter extends Vue {
  public created() {
    const preToken = this.$route.query.oauth_token;
    const verifier = this.$route.query.oauth_verifier;

    Logger.LOG_LEVEL = 0;

    Auth.currentAuthenticatedUser().then((cred) => {
      // console.log(cred);
    });

    if (typeof preToken === 'string' && typeof verifier === 'string') {
      this.getToken(preToken, verifier)
        .then((response) => {
          const {
            id,
            twitterId,
            name,
            screenName,
            iconUrl,
            token,
            secret,
          } = response.data;

          this.signin(token, secret, id, twitterId, screenName);
        })
        .then((cred) => {
          // If success, you will get the AWS credentials
          // console.log(cred);
          return Auth.currentAuthenticatedUser();
        })
        .then((user) => {
          // If success, the user object you passed in Auth.federatedSignIn
          // console.log(user);
        })
        .catch((e) => {
          // console.log(e);
        });
    }
  }

  private getToken(
    oauthToken: string,
    oauthVerifier: string,
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

    return fetch(url, postInit).then((response) =>
      wrapper<SigninData>(response.json()),
    );
  }

  private signin(
    token: string,
    secret: string,
    id: string,
    twitterId: string,
    screenName: string,
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
      user,
    );
  }
}
</script>
