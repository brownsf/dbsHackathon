import { mount, createLocalVue } from '@vue/test-utils';
import VueRouter from 'vue-router';
import Vue from 'vue';
import Vuex from 'vuex';
import Vuetify from 'vuetify';
import Login from '@/components/Login';

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

    wrp = mount(Login, {
      localVue,
      router,
    });
  });

  it('should render', () => {
    expect(wrp.html()).toMatchSnapshot();
  });
  it('should have a text input', () => {
    const Constructor = Vue.extend(Login);
    const vm = new Constructor().$mount();
    expect(vm.$el.querySelector('.sbButton').textContent).toEqual('submit');
  });

  it('clicks the button', () => {
    const wrapper = mount(Login, { store });
    wrapper.vm.$refs.form.validate = () => true;
    wrapper.find('.sbButton').trigger('click');
    expect(actions.register.mock.calls).toHaveLength(1);
  });
});
