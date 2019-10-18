<template>
  <v-menu
    bottom
    left
    :close-on-content-click="false"
    transition="slide-y-transition"
    offset-y
    :content-class="isDark ? 'menu-grey' : 'white'"
  >
    <template v-slot:activator="{ on }">
      <v-btn icon v-on="on">
        <v-icon>fa-bars</v-icon>
      </v-btn>
    </template>

    <v-list dense nav :color="isDark ? 'menu-grey' : 'white'">
      <slot></slot>
    </v-list>
  </v-menu>
</template>

<script lang="ts">
import { Component, Watch, Vue } from 'vue-property-decorator';
import theme from '@/store/modules/theme';

@Component
export default class NavBarMenu extends Vue {
  private isDark: boolean = false;
  private isSmartphoneWidth: boolean = false;
  private BoundaryWidth = 980;

  public created() {
    this.isDark = theme.theme === 'dark';
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'theme/setTheme') {
        this.isDark = mutation.payload === 'dark';
      }
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > BoundaryWidth) {
        this.isSmartphoneWidth = true;
      } else {
        this.isSmartphoneWidth = false;
      }
    });
  }
}
</script>

<style lang="scss" scoped>
.menu-grey {
  background: #484848 !important;
}
</style>
