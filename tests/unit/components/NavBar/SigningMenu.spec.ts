import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuetify from 'vuetify';
import Vuex from 'vuex';
import SigningMenu from '@/components/NavBar/SigningMenu.vue';

const localVue = createLocalVue();

localVue.use(Vuetify);

describe('Component', () => {
  let wrapper;

  beforeEach(() => {
    const store = new Vuex.Store({});
    wrapper = shallowMount(SigningMenu, { store, localVue });
  });

  test('is a Vue instance', () => {
    expect(wrapper.element).toMatchSnapshot();
  });
});
