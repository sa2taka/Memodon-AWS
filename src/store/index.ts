import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

interface RootState {
  version: string;
}

const store = new Vuex.Store<RootState>({
  state: {
    version: '1.0.0',
  },
});

export default store;
