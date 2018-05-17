import { mount } from '@vue/test-utils';
import VueRouter from 'vue-router';
import Vue from 'vue';
import Vuex from 'vuex';
import Vuetify from 'vuetify';
import Login from '@/components/Login';
import router from '@/router';

Vue.use(Vuex);
Vue.use(Vuetify);
Vue.use(VueRouter);
describe('Login', () => {
  const state = { data: {} };
  const actions = {
    register: jest.fn(),
    getAllTopics: jest.fn(),
    login: jest.fn(),
  };
  const getters = {
    isAuth: () => true,
  };

  const store = new Vuex.Store({
    state,
    actions,
    getters,
  });

  it('should render', () => {
    // expect(wrp.html()).toMatchSnapshot();
    const wrapper = mount(Login, { store, router });
    expect(wrapper.html()).toMatchSnapshot();
  });
  it('should have a text input', () => {
    const Constructor = Vue.extend(Login);
    const vm = new Constructor({ router, store }).$mount();
    expect(vm.$el.querySelector('.sbButton').textContent).toEqual('submit');
  });

  it('clicks the button', () => {
    const wrapper = mount(Login, { store, router });
    wrapper.vm.$refs.form.validate = () => true;
    wrapper.find('.sbButton').trigger('click');
    expect(actions.login.mock.calls).toHaveLength(1);
  });
});
