<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="290">
      <v-card>
        <!-- pb-4 adjusts bottom margin to equal top margin -->
        <v-card-title class="headline pb-4" justify="center">
          <loading
            :isComplete="isComplete"
            :isError="isError"
            :side="side"
          ></loading>
          <p class="ml-4 my-auto">Singing in...</p>
        </v-card-title>
        <div v-if="!isComplete && isError">
          <v-card-text>
            <p v-if="reason === 'auth_error'">
              We're sorry, but something error occured processing the singin.<br>
              Please retry.
            </p>
            <p v-if="reason === 'timeout'">
              Timeout occured processing the signin.<br>
              Please retry.
            </p>
            <p v-if="reason === 'invalid_access'">
              Invalid access.<br>
              Go to "Sign in with Twitter" if you want to signin.
            </p>
          </v-card-text>

          <v-divider>
            <v-btn primary text @click="returnTopPage">Sure</v-btn>
          </v-divider>

          <v-card-actions></v-card-actions>
        </div>
      </v-card>
    </v-dialog>
  </v-row>
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
  private isError = false;
  private side = 42;

  private dialog = true;

  private reason: 'timeout' | 'auth_error' | 'invalid_access' =
    'auth_error';

  public created() {
    const preToken = this.$route.query.oauth_token;
    const verifier = this.$route.query.oauth_verifier;

    setTimeout(() => {
      if (!isError) {
        this.reason = 'timeout';
        this.isError = true;
      }
    }, 30 * 1000);

    if (typeof preToken === 'string' && typeof verifier === 'string') {
      this.signinFlow(preToken, verifier);
    } else {
      this.isError = true;
      this.reason = 'invalid_access';
      return;
    }
  }

  private signinFlow(preToken: string, verifier: string) {
    let twitterIdInfo: string;
    let displayNameInfo: string;
    let iconUrlInfo: string;

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
        const existedUser = (await this.getUser(user.id)) as {
          data: {
            getUser: UserState;
          };
        };

        if (existedUser.data.getUser) {
          return existedUser.data.getUser;
        }

        const createdUser = (await this.pushUserToDatabase(
          user,
          twitterIdInfo,
          displayNameInfo,
          iconUrlInfo
        )) as {
          data: {
            createUser: UserState;
          };
        };

        return createdUser.data.createUser;
      })
      .then(async (userInfo) => {
        return this.setUserInfoToState(userInfo);
      })
      .then((data) => {
        this.isComplete = true;
        setTimeout( () => {
          this.returnTopPage();
        }, 3 * 1000);
      })
      .catch ((e) => {
        this.isError = true;
        this.reason = 'auth_error';
      });
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

  private returnTopPage() {
    this.$router.push('/');
  }
}
</script>
