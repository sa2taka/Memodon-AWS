import { mount, shallowMount, createLocalVue } from '@vue/test-utils';
import Vuetify from 'vuetify';
import Router from 'vue-router';
import App from '@/App.vue';

describe('App.vue', () => {
  let wrapper;
  let localVue;

  beforeAll(() => {
    localVue = createLocalVue();
    localVue.use(Vuetify, {});
    localVue.use(Router);
  });

  beforeEach(() => {
    wrapper = shallowMount(App, { localVue });
  });

  it('should display navigation bar', () => {
    expect(wrapper.html()).toContain('<span>Memodon</span>');
    expect(wrapper.html()).toContain('Dark Mode');
  });

  it('should be light theme at first', () => {
    expect(wrapper.html()).not.toContain('dark="true"');
  });

  it('should become dark mode', () => {
    const setThemeMock = jest.fn();
    wrapper.setMethods({
      setTheme: setThemeMock,
    });
    wrapper.vm.$data.isDark = true;

    expect(setThemeMock).toBeCalled();
    expect(wrapper.html()).toContain('dark="true"');
  });

  it('should become dark mode if localStorage.theme equals dark', () => {
    const setThemeMock = jest.fn();

    localStorage.setItem('theme', 'dark');

    wrapper = shallowMount(App, {
      localVue,
      vuetify: new Vuetify(), // is this.$vuetify in App.vue
    });

    expect(wrapper.html()).toContain('dark="true"');
  });
});
