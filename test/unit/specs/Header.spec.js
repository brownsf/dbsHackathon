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
    const wrapper = mount(Header, { store, router });
    expect(wrapper.html()).toMatchSnapshot();
  });
  it('should have 4 btns', () => {
    const wrapper = mount(Header, { store, router });
    const btns = wrapper.findAll('.link');
    expect(btns.length).toBe(2);
  });
});
