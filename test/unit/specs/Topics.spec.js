import { mount, createLocalVue } from '@vue/test-utils';
import VueRouter from 'vue-router';
import Vue from 'vue';
import Vuex from 'vuex';
import Vuetify from 'vuetify';
import Topics from '@/components/Topics';
import router from '@/router';

Vue.use(Vuex);
Vue.use(Vuetify);
Vue.use(VueRouter);
describe('Comments', () => {
  const state = { data: { topic: { name: 'here' }, singleTopicLoad: false } };
  const actions = {
    register: jest.fn(),
    getAllTopics: jest.fn(),
    login: jest.fn(),
    getTopic: jest.fn(),
    addComment: jest.fn(),
    addTopic: jest.fn(),
  };
  const getters = {
    isAuth: () => true,
    singleTopic: () => ({
      comments: [
        {
          message: 'one',
        },
        { message: 'two' },
      ],
    }),
  };

  const store = new Vuex.Store({
    state,
    actions,
    getters,
  });
  const wrapper = mount(Topics, { store, router });
  it('should render', () => {
    // expect(wrp.html()).toMatchSnapshot();

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should save comment', () => {
    wrapper.vm.$refs.form.validate = () => true;
    wrapper.find('.saveTopic').trigger('click');
    expect(actions.addTopic.mock.calls).toHaveLength(1);
  });

  it('should render state corrently', () => {
    expect(wrapper.findAll('.loader')).toHaveLength(0);
    expect(wrapper.findAll('.errorAlert')).toHaveLength(0);
  });
});
