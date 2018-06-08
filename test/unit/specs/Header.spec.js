import { mount } from '@vue/test-utils';
import VueRouter from 'vue-router';
import Vue from 'vue';
import Vuex from 'vuex';
import Vuetify from 'vuetify';
import Header from '@/components/Header';
import router from '@/router';

Vue.use(Vuex);
Vue.use(Vuetify);
Vue.use(VueRouter);
describe('Login', () => {
  let wrapper;
  const isAuth = jest.fn(() => true);
  const logout = jest.fn();
  beforeEach(() => {
    const state = { isAuth: false, data: {} };
    const actions = {
      register: jest.fn(),
      getAllTopics: jest.fn(),
      login: jest.fn(),
      logout,
    };
    const getters = {
      isAuth,
    };

    const store = new Vuex.Store({
      state,
      actions,
      getters,
    });
    wrapper = mount(Header, { store, router });
  });

  it('should render', () => {
    // expect(wrp.html()).toMatchSnapshot();

    expect(wrapper.html()).toMatchSnapshot();
  });
  it('should have 4 btns', () => {
    const btns = wrapper.findAll('.link');
    expect(btns.length).toBe(2);
    expect(isAuth).toBeCalledWith(
      { data: {}, isAuth: false },
      { isAuth: true },
      { data: {}, isAuth: false },
      { isAuth: true },
    );
  });

  it('should logout', () => {
    const btn = wrapper.findAll('.link');
    btn.at(1).trigger('click');
    expect(logout).toBeCalled();
  });
});
