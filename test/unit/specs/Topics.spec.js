import { mount } from '@vue/test-utils';
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
    vote: jest.fn(),
  };
  const getters = {
    isAuth: () => true,
    getTopics: () => [{ id: 1, name: 'yep' }],
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
    expect(actions.getAllTopics.mock.calls).toHaveLength(1);
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

  it('should vote', () => {
    wrapper.find('.voter').trigger('click');
    expect(actions.vote.mock.calls).toHaveLength(1);
  });

  it('should redirect', () => {
    const store2 = new Vuex.Store({
      state,
      actions,
      getters: { ...getters, isAuth: () => false },
    });
    const wrp = mount(Topics, { store: store2, router });
    expect(wrp.vm.router).toMatchSnapshot();
  });
});
