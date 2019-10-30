import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuetify from 'vuetify';
import Vuex from 'vuex';
import NavBarMenu from '@/components/NavBar/NavBarMenu.vue';

const localVue = createLocalVue();

localVue.use(Vuetify);

describe('Component', () => {
  let wrapper;

  beforeEach(() => {
    const store = new Vuex.Store({});
    wrapper = shallowMount(NavBarMenu, {
      store,
      localVue,
      vuetify: new Vuetify(),
    });
  });

  test('is a Vue instance', () => {
    expect(wrapper.element).toMatchSnapshot();
    expect(wrapper.find('v-menu-stub').exists()).toBe(true);
    expect(wrapper.find('v-menu-stub').attributes().contentclass).toBe('white');
  });

  test('is dark mode', () => {
    wrapper.vm.isDark = true;
    expect(wrapper.element).toMatchSnapshot();
    expect(wrapper.find('v-menu-stub').attributes().contentclass).toBe(
      'menu-grey'
    );
  });

  test('is smartphone mode', () => {
    wrapper.vm.isSmartphoneWidth = true;
    expect(wrapper.element).toMatchSnapshot();
    expect(wrapper.find('v-navigation-drawer-stub').exists()).toBe(true);
  });
});
