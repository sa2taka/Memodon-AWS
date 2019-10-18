import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuetify from 'vuetify';
import Vuex from 'vuex';
import DarkThemeSwitch from '@/components/Molecules/darkThemeSwitch.vue';

const localVue = createLocalVue();

localVue.use(Vuetify);

describe('Component', () => {
  let wrapper;

  beforeEach(() => {
    const store = new Vuex.Store({
      state: {
        theme: {
          themes: 'light',
        },
      },
    });
    wrapper = shallowMount(DarkThemeSwitch, { store, localVue });
  });

  test('is a Vue instance', () => {
    expect(wrapper.element).toMatchSnapshot();
  });

  test('become dark mode', () => {
    const functionMock = jest.fn();
    wrapper.setMethods({
      onChangeTheme: functionMock,
    });
    wrapper.vm.$data.isDark = true;
  });
});
