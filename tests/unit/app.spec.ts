import { mount, shallowMount, createLocalVue } from '@vue/test-utils';
import Vuetify from 'vuetify';
import Vuex from 'vuex';
import Router from 'vue-router';
import App from '@/App.vue';

const localVue = createLocalVue();

describe('App.vue', () => {
  let wrapper;
  let localVue;
  let store;

  beforeAll(() => {
    localVue = createLocalVue();
    localVue.use(Vuetify, {});
    localVue.use(Router);
    localVue.use(Vuex);
  });

  beforeEach(() => {
    store = new Vuex.Store({
      state: {
        theme: {
          themes: 'light',
        },
      },
    });
    wrapper = shallowMount(App, { store, localVue, vuetify: new Vuetify() });
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

  it('should storageState is null when localStorage is empty', () => {
    expect(wrapper.vm.storageState).toBe(null);
  });

  it('should parse localStorage', () => {
    const key = 'memodonState';
    const value =
      '{"version":"1.0.0","theme":{"theme":"light"},"user":{"id":"","twitterId":"","userName":"","displayName":"","iconUrl":"","isSignin":false}}';
    localStorage.setItem(key, value);

    wrapper = shallowMount(App, {
      store,
      localVue,
      vuetify: new Vuetify(),
    });

    expect(wrapper.vm.storageState).not.toBe(null);
    expect(wrapper.vm.storageState).toEqual(JSON.parse(value));
    // It is not toEqual but toBe because storageState and storageStateEntity should be same object
    expect(wrapper.vm.storageState).toBe(wrapper.vm.storageStateEntity);
  });

  it('should use storageStateEntity as storageState instead localStorage if storageStateEntity is not null', () => {
    wrapper.setData({
      storageStateEntity: {
        theme: {
          theme: 'light',
        },
      },
    });
    expect(wrapper.vm.storageState.theme.theme).toBe('light');
  });

  it('should user is update from localStorage', () => {
    const key = 'memodonState';
    const value =
      '{"version":"1.0.0","theme":{"theme":"light"},"user":{"id":"testedValue","twitterId":"","userName":"","displayName":"","iconUrl":"","isSignin":true}}';
    localStorage.setItem(key, value);

    wrapper = shallowMount(App, {
      store,
      localVue,
      vuetify: new Vuetify(),
    });

    expect(wrapper.vm.storageState.user.id).toBe('testedValue');
  });
});
