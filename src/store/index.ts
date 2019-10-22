import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

interface RootState {
  version: string;
}

const store = new Vuex.Store<RootState>({
  state: {
    version: '1.0.0',
  },
  plugins: [
    createPersistedState({
      key: 'memodonState',
    }),
  ],
});

export default store;
