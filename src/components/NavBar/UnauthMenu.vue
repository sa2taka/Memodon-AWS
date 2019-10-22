<template>
  <nav-bar-menu>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title>
          <v-btn text @click="singinWithTwitter">
            <v-icon color="#1DA1F2" v-html="'$vuetify.icons.twitter'"></v-icon>
            <p class="ml-1 my-auto">Sign in with Twitter</p>
          </v-btn>
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
import NavBarMenu from '@/components/NavBar/NavBarMenu.vue';
import DarkThemeSwitch from '@/components/Molecules/darkThemeSwitch.vue';
import theme from '@/store/modules/theme';

@Component({
  components: {
    NavBarMenu,
    DarkThemeSwitch,
  },
})
export default class UnauthMenu extends Vue {
  private singinWithTwitter() {
    const url = 'https://api.memodon.com/v1/twitter/auth-page';
    location.href = url;
  }
}
</script>

<style lang="scss" scoped></style>
