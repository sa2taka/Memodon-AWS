import Vuex from 'vuex';

interface RootState {
  version: string;
}

const store = new Vuex.Store<RootState>({
  state: {
    version: '1.0.0',
  },
  modules: {},
});

export default store;
