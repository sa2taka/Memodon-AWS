import Vue from 'vue';
import Vuex from 'vuex';

import Theme from '@/store/modules/theme';

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
