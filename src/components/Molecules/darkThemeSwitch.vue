<template>
  <v-switch
    v-model="isDark"
    class="center-switch"
    :dark="isDark"
    id="dark-mode-switch"
    color="accent"
  ></v-switch>
</template>

<script lang="ts">
import { Component, Watch, Vue } from 'vue-property-decorator';
import theme from '@/store/modules/theme';

@Component
export default class DarkThemeSwitch extends Vue {
  private isDark: boolean = false;

  public created() {
    this.isDark = theme.theme === 'dark';
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'theme/setTheme') {
        this.isDark = mutation.payload === 'dark';
      }
    });
  }

  @Watch('isDark')
  public onChangeTheme(isDark: boolean) {
    theme.setTheme(isDark ? 'dark' : 'light');
  }
}
</script>

<style lang="scss" scoped></style>
