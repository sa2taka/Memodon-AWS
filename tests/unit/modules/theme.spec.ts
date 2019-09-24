// import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import Theme from '@/store/modules/theme';

describe('theme module', () => {
  test('Theme state should become dark mode', () => {
    expect(Theme.theme).toBe('light');
    Theme.setTheme('dark');
    expect(Theme.theme).toBe('dark');
  });
});
