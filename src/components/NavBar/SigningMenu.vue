<template>
  <nav-bar-menu>
    <v-list-item @click="">
      <v-list-item-avatar>
        <v-img :src="user.iconUrl"></v-img>
      </v-list-item-avatar>

      <v-list-item-content>
        <v-list-item-title v-html="user.displayName"></v-list-item-title>
        <v-list-item-subtitle v-html="user.userName"></v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title>
          <div class="signout-button">
            <v-btn depressed rounded color="primary" @click="signout">
              <v-icon small left>fa-sign-out-alt</v-icon>
              <p class="my-auto">Signout</p>
            </v-btn>
          </div>
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-divider></v-divider>
    <v-list-item>
      <template v-slot:default="{ active, toggle }">
        <v-list-item-content>
          <v-list-item-title>Dark Mode</v-list-item-title>
        </v-list-item-content>

        <v-list-item-action>
          <dark-theme-switch></dark-theme-switch>
        </v-list-item-action>
      </template>
    </v-list-item>
  </nav-bar-menu>
</template>

<script lang="ts">
import { Component, Watch, Vue } from 'vue-property-decorator';
import { Auth } from 'aws-amplify';

import NavBarMenu from '@/components/NavBar/NavBarMenu.vue';
import DarkThemeSwitch from '@/components/Molecules/darkThemeSwitch.vue';

import theme from '@/store/modules/theme';
import User, { UserState } from '@/store/modules/user';

@Component({
  components: {
    NavBarMenu,
    DarkThemeSwitch,
  },
})
export default class SigningMenu extends Vue {
  private user: UserState = User;

  public created() {
    this.$store.subscribe((mutation, state) => {
      if (mutation.type.startsWith('user/')) {
        this.user = mutation.payload;
      }
    });
  }
  private signout() {
    User.signOut();
    Auth.signOut()
      .then((data) => {
        this.$router.push('/');
      })
      .catch((err) => {
        this.$router.push('/');
      });
  }
}
</script>

<style lang="scss" scoped>
.signout-button {
  position: relative;
  width: 100%;
  text-align: end;
}
</style>
