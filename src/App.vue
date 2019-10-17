<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>Memodon</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <unauth-menu v-if="!isSignin"></unauth-menu>

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

import UnauthMenu from '@/components/NavBar/UnauthMenu.vue';

@Component({
  components: {
    UnauthMenu,
  },
})
export default class App extends Vue {
  public isDark: boolean = false;
  private storageStateEntity: any = null;

  public created() {
    this.setTheme();
    this.setUser();
    this.subscribeTheme();
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
    if (this.storageState && this.storageState.user.isSignin) {
      User.setUser(this.storageState.user);
    }
  }

  private subscribeTheme() {
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'theme/setTheme') {
        this.isDark = mutation.payload === 'dark';
      }
    });
  }

  private updateTheme(isDark: boolean) {
    this.$vuetify.theme.dark = isDark;
    Theme.setTheme(isDark ? 'dark' : 'light');
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
