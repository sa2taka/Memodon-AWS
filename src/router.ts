import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import SigninWithTwitter from './views/SigninWithTwitter.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/signin/twitter',
      name: 'singinWithTwitter',
      component: SigninWithTwitter,
    },
  ],
});
