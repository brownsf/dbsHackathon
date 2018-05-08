import { mount, createLocalVue } from '@vue/test-utils';
import VueRouter from 'vue-router';
import Vue from 'vue';
import Vuex from 'vuex';
import Vuetify from 'vuetify';
import Comments from '@/components/Comments';
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
  const wrapper = mount(Comments, { store, router });
  it('should render', () => {
    // expect(wrp.html()).toMatchSnapshot();

    expect(wrapper.html()).toMatchSnapshot();
  });
  it('should get all topic info', () => {
    wrapper.setProps({ selected: 1 });
    expect(actions.getTopic.mock.calls).toHaveLength(1);
    wrapper.setProps({ selected: 0 });
    expect(actions.getTopic.mock.calls).toHaveLength(1);
  });

  it('should save comment', () => {
    wrapper.vm.$refs.form.validate = () => true;
    wrapper.find('.saveComment').trigger('click');
    expect(actions.addComment.mock.calls).toHaveLength(1);

    wrapper.vm.$refs.form.validate = () => false;
    wrapper.find('.saveComment').trigger('click');
    expect(actions.addComment.mock.calls).toHaveLength(1);
  });

  it('should render state corrently', () => {
    expect(wrapper.findAll('.loader')).toHaveLength(0);
    expect(wrapper.findAll('.errorAlert')).toHaveLength(0);
  });
});
