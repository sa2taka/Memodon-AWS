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
import anime from 'animejs';
import Loading from '@/components/Atomic/Loading.vue';
import theme from '@/store/modules/theme';
import signinWithTwitter from '@/libs/signinWithTwitter';

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

    // To eliminate token and verifier
    this.$router.replace('/signin/twitter');

    signinWithTwitter(preToken, verifier)
      .then((user) => {
        this.isComplete = true;
        this.runAnime()
          .then(() => {
            this.returnTopPage();
          })
          .catch(() => {
            this.returnTopPage();
          });
      })
      .catch((reason) => {
        this.isError = true;
        this.reason = reason;
      });
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
