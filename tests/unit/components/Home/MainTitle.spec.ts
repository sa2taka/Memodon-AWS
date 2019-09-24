import { mount } from '@vue/test-utils';
import MainTitle from '@/components/Home/MainTitle.vue';

describe('Component', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(MainTitle);
    expect(wrapper.element).toMatchSnapshot();
  });
});
