import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import '@fortawesome/fontawesome-free/css/all.css';
import ja from 'vuetify/src/locale/ja';
import values from './iconValues';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    options: {
      customProperties: true,
    },
    themes: {
      light: {
        primary: '#009688',
        secondary: '#ff5722',
        accent: '#00bcd4',
        error: '#f44336',
        warning: '#cddc39',
        info: '#8bc34a',
        success: '#2196f3',
      },
      dark: {
        primary: '#009688',
        secondary: '#ff5722',
        accent: '#00bcd4',
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
    values,
  },
});
