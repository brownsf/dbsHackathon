import { shallow } from '@vue/test-utils';
import VueRouter from 'vue-router';
import Vue from 'vue';
import Vuex from 'vuex';
import Vuetify from 'vuetify';
import App from '@/App';
import router from '@/router';
import Header from '@/components/Header';

Vue.use(Vuex);
Vue.use(Vuetify);
Vue.use(VueRouter);
describe('App', () => {
  let wrapper;
  const isAuth = jest.fn(() => false);
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
      getTopics: () => [{ id: 1, name: 'yep' }],
    };

    const store = new Vuex.Store({
      state,
      actions,
      getters,
    });
    wrapper = shallow(App, { store, router });
  });

  it('should render', () => {
    // expect(wrp.html()).toMatchSnapshot();

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should have a header', () => {
    const Constructor = Vue.extend(App);
    const vm = new Constructor({ router }).$mount();
    expect(vm.$el).toMatchSnapshot();
    expect(App.components).toEqual({ 'header-comp': Header });
  });
});
