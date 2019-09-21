import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import ja from 'vuetify/src/locale/ja';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    options: {
      customProperties: true,
    },
    themes: {
      light: {
        primary: '#009688',
        secondary: '#00bcd4',
        accent: '#ff5722',
        error: '#f44336',
        warning: '#cddc39',
        info: '#8bc34a',
        success: '#2196f3',
      },
      dark: {
        primary: '#009688',
        secondary: '#00bcd4',
        accent: '#ff5722',
        error: '#f44336',
        warning: '#cddc39',
        info: '#8bc34a',
        success: '#2196f3',
      },
    },
  },
  lang: {
    locales: { ja },
    current: 'ja',
  },
  icons: {
    iconfont: 'fa',
  },
});
