import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuetify from 'vuetify';
import Vuex from 'vuex';
import UnauthMenu from '@/components/NavBar/UnauthMenu.vue';

const localVue = createLocalVue();

localVue.use(Vuetify);

describe('Component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(UnauthMenu, { localVue });
  });

  test('is a Vue instance', () => {
    expect(wrapper.element).toMatchSnapshot();
  });
});
