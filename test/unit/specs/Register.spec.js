import { mount, createLocalVue } from '@vue/test-utils';
import VueRouter from 'vue-router';
import Vue from 'vue';
import Vuex from 'vuex';
import Vuetify from 'vuetify';
import Register from '@/components/Register';

Vue.use(Vuex);
describe('Register', () => {
  let wrp;

  const routes = [{ path: '/items/:item_id/edit', name: 'item-edit' }];
  const state = { data: {} };
  const actions = {
    register: jest.fn(),
  };

  const store = new Vuex.Store({
    state,
    actions,
  });
  const router = new VueRouter({ routes });

  beforeEach(() => {
    const localVue = createLocalVue();
    localVue.use(VueRouter);
    localVue.use(Vuetify);

    wrp = mount(Register, {
      store,
      localVue,
      router,
    });
  });

  it('should render', () => {
    expect(wrp.html()).toMatchSnapshot();
  });
  it('should have a text input', () => {
    expect(
      wrp
        .find('.sbButton')
        .find('.btn__content')
        .html(),
    ).toEqual('<div class="btn__content">submit</div>');
  });

  it('clicks the button', () => {
    const wrapper = mount(Register, { store });
    wrapper.vm.$refs.form.validate = () => true;
    wrapper.find('.sbButton').trigger('click');
    expect(actions.register.mock.calls).toHaveLength(1);
  });
});
