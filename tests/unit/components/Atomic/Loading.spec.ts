import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuetify from 'vuetify';
import Loading from '@/components/Atomic/Loading.vue';

const localVue = createLocalVue()

localVue.use(Vuetify);

describe('Component', () => {
  test('is a Vue instance', () => {
    const wrapper = shallowMount(Loading, { localVue });
    expect(wrapper.element).toMatchSnapshot();
  });
  
  test('become checkmark when process complete', () => {
    const wrapper = shallowMount(Loading, {
      propsData: {
        isComplete: true,  
      }
    });
    expect(wrapper.element).toMatchSnapshot();
  });
  
  test('become cross when process error', () => {
    const wrapper = shallowMount(Loading, {
      propsData: {
        isError: true,  
      }
    });
    expect(wrapper.element).toMatchSnapshot();
  });
});
