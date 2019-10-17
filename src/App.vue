<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>Memodon</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-label :dark="isDark">Dark Mode</v-label>
      <v-switch
        v-model="isDark"
        class="center-switch"
        :dark="isDark"
        id="dark-mode-switch"
      ></v-switch>
      <v-btn v-if="!isSignin" text @click="singinWithTwitter">
        <v-icon color="#1DA1F2" v-html="'$vuetify.icons.twitter'"></v-icon>
        <p class="ml-1 my-auto">Sign in with Twitter</p>
      </v-btn>
      <v-btn v-else text @click="sighout">
        <p class="ml-1 my-auto">Sign out</p>
      </v-btn>
    </v-app-bar>

    <v-content id="main">
      <router-view />
    </v-content>
  </v-app>
</template>

<script lang="ts">
import { Component, Watch, Vue } from 'vue-property-decorator';
import Theme from '@/store/modules/theme';
import User from '@/store/modules/user';

import { Auth } from 'aws-amplify';

@Component
export default class App extends Vue {
  public isDark: boolean = false;
  private storageStateEntity: any = null;

  public created() {
    this.setTheme();
    this.setUser();
  }

  @Watch('isDark')
  public changedTheme(isDark: boolean) {
    this.updateTheme(isDark);
  }

  public get isSignin() {
    return User.isSignin;
  }

  private setTheme() {
    if (this.storageState) {
      this.isDark = this.storageState.theme.theme === 'dark';
      this.updateTheme(this.isDark);
    }
  }

  private setUser() {
    if (this.storageState) {
      User.setUser(this.storageState.user);
    }
  }

  private updateTheme(isDark: boolean) {
    this.$vuetify.theme.dark = isDark;
    Theme.setTheme(isDark ? 'dark' : 'light');
  }

  private singinWithTwitter() {
    const url = 'https://api.memodon.com/v1/twitter/auth-page';
    location.href = url;
  }

  private sighout() {
    User.signOut();
    Auth.signOut()
      .then((data) => {
        this.$forceUpdate();
      })
      .catch((err) => {
        this.$forceUpdate();
      });
  }

  private get storageState(): any {
    if (this.storageStateEntity) {
      return this.storageStateEntity;
    }
    this.storageStateEntity = JSON.parse(localStorage.memodonState);
    return this.storageStateEntity;
  }
}
</script>
<style lang="scss" scoped>
#main {
  width: 90%;
  position: relative;
  margin: 0 auto;
}

.center-switch {
  position: relative;
  top: 12px;
  margin-left: 4px;
}
</style>
