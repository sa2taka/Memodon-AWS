import { shallowMount, createLocalVue } from '@vue/test-utils';
import MainTitle from '@/components/Home/MainTitle.vue';
import Vuex from 'vuex';
import Vuetify from 'vuetify';

const localVue = createLocalVue();

localVue.use(Vuex);
localVue.use(Vuetify);

describe('Component', () => {
  test('is a Vue instance', () => {
    const store = new Vuex.Store({
      state: {
        theme: {
          themes: 'light',
        },
      },
    });
    const wrapper = shallowMount(MainTitle, { store, localVue });
    expect(wrapper.element).toMatchSnapshot();
  });
});
