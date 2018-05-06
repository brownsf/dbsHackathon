import { mount, createLocalVue } from '@vue/test-utils';
import VueRouter from 'vue-router';
import Vue from 'vue';
import Vuex from 'vuex';
import Vuetify from 'vuetify';
import Register from '@/components/Register';

Vue.use(Vuex);
describe('Register', () => {
  let wrp;
  let store;
  let actions;
  let state;
  const routes = [{ path: '/items/:item_id/edit', name: 'item-edit' }];
  state = { data: {} };
  actions = {
    register: jest.fn(),
  };

  store = new Vuex.Store({
    state,
    actions,
  });
  const router = new VueRouter({ routes });

  beforeEach(() => {
    const localVue = createLocalVue();
    localVue.use(VueRouter);
    localVue.use(Vuetify);

    wrp = mount(Register, {
      localVue,
      router,
    });
  });

  it('should render', () => {
    expect(wrp.html()).toMatchSnapshot();
  });
  it('should have a text input', () => {
    const Constructor = Vue.extend(Register);
    const vm = new Constructor().$mount();
    expect(vm.$el.querySelector('.sbButton').textContent).toEqual('submit');
  });

  it('clicks the button', () => {
    const wrapper = mount(Register, { store });
    wrapper.vm.$refs.form.validate = () => true;
    wrapper.find('.sbButton').trigger('click');
    expect(actions.register.mock.calls).toHaveLength(1);
  });
});
