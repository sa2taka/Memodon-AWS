<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="290">
      <v-card class="message-card">
        <!-- pb-4 adjusts bottom margin to equal top margin -->
        <v-card-title class="headline pb-4" justify="center">
          <loading
            :isComplete="isComplete"
            :isError="isError"
            :side="side"
          ></loading>
          <p class="ml-4 my-auto">Signing in...</p>
        </v-card-title>

        <div>
          <v-card-text>
            <span class="text-wrapper" v-show="isComplete" style="height: 66px">
              <div class="mx-auto">
                <div class="letters">Welcome to Memodon</div>
                <span class="line"></span>
              </div>
            </span>
            <transition name="error-message">
              <p
                v-if="!isComplete && isError && reason === 'auth_error'"
                style="height: 66px"
              >
                We're sorry, but something error occured processing the singin.
                <br />Please retry.
              </p>
            </transition>
            <transition name="error-message">
              <p
                v-if="!isComplete && isError && reason === 'timeout'"
                style="height: 66px"
              >
                Timeout occured processing the signin.
                <br />Please retry.
              </p>
              <p
                v-if="!isComplete && isError && reason === 'invalid_access'"
                style="height: 66px"
              >
                Invalid access.
                <br />Go to "Sign in with Twitter" if you want to signin.
              </p>
              <p
                v-if="!isComplete && isError && reason === 'already_singed'"
                style="height: 66px"
              >
                You have already singed in.
              </p>
            </transition>
            <!-- empty padding -->
            <p v-if="!isComplete && !isError" style="height: 66px"></p>
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <transition name="error-button">
              <v-btn
                class="font-weight-bold"
                color="primary"
                text
                large
                @click="returnTopPage"
                v-if="!isComplete && isError"
                >Sure</v-btn
              >
            </transition>
            <!-- empty padding -->
            <p v-if="!isError" style="height: 28px"></p>
          </v-card-actions>
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

import anime from 'animejs';

import Loading from '@/components/Atomic/Loading.vue';
import { SigninEndPoint } from '@/libs/globalConstVariables';

import { GRAPHQL_AUTH_MODE, GraphQLResult } from '@aws-amplify/api/lib/types';
import { UserData } from 'aws-sdk/clients/sms';

import theme from '@/store/modules/theme';

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

  private reason:
    | 'timeout'
    | 'auth_error'
    | 'invalid_access'
    | 'already_singed' = 'auth_error';

  public async created() {
    const preToken = this.$route.query.oauth_token;
    const verifier = this.$route.query.oauth_verifier;

    setTimeout(() => {
      if (!this.isError) {
        this.reason = 'timeout';
        this.isError = true;
      }
    }, 30 * 1000);

    // Catch return null because throw error if have not authenticated
    const existedUser = await Auth.currentAuthenticatedUser().catch(
      (e) => null
    );

    if (existedUser) {
      this.reason = 'already_singed';
      this.isError = true;
      return;
    }

    if (typeof preToken === 'string' && typeof verifier === 'string') {
      this.signinAlongFlow(preToken, verifier);
    } else {
      this.isError = true;
      this.reason = 'invalid_access';
      this.runAnime();
      return;
    }
  }

  private signinAlongFlow(preToken: string, verifier: string) {
    let twitterIdInfo: string;
    let displayNameInfo: string;
    let iconUrlInfo: string;
    let tokenInfo: string;
    let secretInfo: string;

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
        displayNameInfo = name;
        iconUrlInfo = iconUrl;
        tokenInfo = token;
        secretInfo = secret;

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
        return this.setUserInfoToState(userInfo);
      })
      .then((data) => {
        this.isComplete = true;
        this.runAnime().then(() => {
          this.returnTopPage();
        });
      })
      .catch((e) => {
        this.isError = true;
        this.reason = 'auth_error';
        User.signOut();
      });
  }

  private getToken(
    oauthToken: string,
    oauthVerifier: string
  ): Promise<SigninData> {
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
    iconUrl: string,
    OAtuhToken: string,
    OAuthSecret: string
  ) {
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
  }

  private setUserInfoToState(data: UserState) {
    return User.setUser(data);
  }

  private returnTopPage() {
    this.$router.push('/');
  }

  private runAnime() {
    const textWrapper: Element | null = document.querySelector('.letters');

    if (textWrapper !== null && textWrapper.textContent !== null) {
      textWrapper.innerHTML = textWrapper.textContent.replace(
        /\S/g,
        '<span class="letter">$&</span>'
      );
    }

    const a = anime
      .timeline()
      .add({
        targets: '.line',
        opacity: [0.5, 1],
        scaleX: [0, 1],
        easing: 'easeInOutExpo',
        duration: 600,
      })
      .add({
        targets: '.letter',
        translateY: ['1.1em', 0],
        translateZ: 0,
        opacity: 1,
        duration: 450,
        delay: (el: Element, i: number) => 25 * i,
      });

    return a.finished;
  }

  private get theme(): string {
    return theme.theme;
  }
}
</script>

<style lang="scss">
.error-message-enter-active,
.error-button-enter-active {
  transition: all 0.3s ease-out;
}

.error-button-enter,
.error-message-enter {
  opacity: 0;
}

.error-message-enter {
  transform: translateX(-20px);
}

.text-wrapper {
  position: relative;
  padding-top: 0.1em;
  padding-right: 0.05em;
  padding-bottom: 0.15em;
  line-height: 1em;

  width: 100%;
  display: flex;
  justify-content: around-space;
}

.line {
  position: absolute;
  background-color: var(--v-primary-base);
  left: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  height: 2px;
  width: 100%;
  transform-origin: 0.5 0;
  top: -1em;
}

.letters {
  $translate: 14px;

  height: 36px;
  overflow: hidden;
  transform: translateY(-$translate);

  .letter {
    display: inline-block;
    opacity: 0;
    font-size: 24px;
    top: $translate;
    position: relative;
  }
}
</style>
