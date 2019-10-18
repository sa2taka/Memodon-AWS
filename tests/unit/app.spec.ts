import { mount, shallowMount, createLocalVue } from '@vue/test-utils';
import Vuetify from 'vuetify';
import Vuex from 'vuex';
import Router from 'vue-router';
import App from '@/App.vue';


const localVue = createLocalVue()

describe('App.vue', () => {
  let wrapper;
  let localVue;

  beforeAll(() => {
    localVue = createLocalVue();
    localVue.use(Vuetify, {});
    localVue.use(Router);
    localVue.use(Vuex);
  });

  beforeEach(() => {
    const store = new Vuex.Store({
        state: {
          theme: {
            themes: 'light'
          }
        },
      })
    wrapper = shallowMount(App, { store, localVue });
  });

  it('should display navigation bar', () => {
    expect(wrapper.html()).toContain('<span>Memodon</span>');
  });

  it('should become dark mode', () => {
    const updateThemeMock = jest.fn();
    wrapper.setMethods({
      updateTheme: updateThemeMock,
    });
    wrapper.vm.$data.isDark = true;

    expect(updateThemeMock).toBeCalled();
  });
});
