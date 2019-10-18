<template>
  <div>
    <v-app-bar-nav-icon
      @click.stop="drawer = !drawer"
      v-if="isSmartphoneWidth"
    ></v-app-bar-nav-icon>
    <v-navigation-drawer
      v-model="drawer"
      absolute
      right
      temporary
      height="100vh"
      :color="isDark ? 'menu-grey' : 'white'"
      v-if="isSmartphoneWidth"
    >
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">
            Memodon
          </v-list-item-title>
          <v-list-item-subtitle>
            Memodon is your note.
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>
      
      <v-list dense nav>
        <slot></slot>
      </v-list>
    </v-navigation-drawer>
    <v-menu
      v-if="!isSmartphoneWidth"
      bottom
      left
      :close-on-content-click="false"
      transition="slide-y-transition"
      offset-y
      :content-class="isDark ? 'menu-grey' : 'white'"
    >
      <template v-slot:activator="{ on }">
        <v-btn icon v-on="on" @click="drawer = !drawer">
          <v-icon>fa-bars</v-icon>
        </v-btn>
      </template>

      <v-list dense nav :color="isDark ? 'menu-grey' : 'white'">
        <slot></slot>
      </v-list>
    </v-menu>
  </div>
</template>

<script lang="ts">
import { Component, Watch, Vue } from 'vue-property-decorator';
import theme from '@/store/modules/theme';
import { MinSmallWidth } from '@/libs/globalConstVariables';

@Component
export default class NavBarMenu extends Vue {
  private isDark: boolean = false;
  private isSmartphoneWidth: boolean = false;
  private BoundaryWidth = MinSmallWidth;
  private drawer: boolean = false;

  public created() {
    this.isDark = theme.theme === 'dark';
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'theme/setTheme') {
        this.isDark = mutation.payload === 'dark';
      }
    });

    this.detectDevice();
    window.addEventListener('resize', () => {
      this.detectDevice();
    });
  }

  private detectDevice() {
    if (window.innerWidth > this.BoundaryWidth) {
      this.isSmartphoneWidth = false;
    } else {
      this.isSmartphoneWidth = true;
    }
  }
}
</script>

<style lang="scss" scoped>
.menu-grey {
  background: #484848 !important;
}
</style>
