import Vuex from 'vuex';
import Vue from 'vue';

import axios from 'axios';

Vue.use(Vuex);
const apiHost = 'http://localhost:8080';
export const mutations = {
  initialiseStore(state) {
    // Check if the ID exists
    if (localStorage.getItem('storeHack')) {
      // Replace the state object with the stored item
      this.replaceState(
        Object.assign(state, {
          ...JSON.parse(localStorage.getItem('storeHack')),
          loginError: false,
          authError: false,
        }),
      );
    }
  },
  addTopic(state, data) {
    state.topics.push(data);
  },
  updateUser(state, data) {
    state.currentUser = data;
    state.authenticated = true;
  },
  errorRegister(state, data) {
    state.authError = data;
  },
  updateTopics(state, data) {
    state.topics = data;
    state.topicLoad = false;
    state.topicError = false;
  },
  loadTopics(state) {
    Vue.set(state, 'topicLoad', true);
    Vue.set(state, 'topicError', false);
  },
  errorTopics(state) {
    state.topicError = true;
    state.topicLoad = false;
  },
  savingTopic(state) {
    state.topicAddError = false;
    state.topicAddLoad = true;
  },
  addedTopic(state) {
    state.topicAddError = false;
    state.topicAddLoad = false;
  },
  errorSaveTopic(state, message) {
    state.topicError = true;
    state.topicLoad = false;
    state.topicErrorMessage = message;
  },
  errorLogin(state, { message }) {
    state.loginError = true;
    state.loginErrorMessage = message;
  },
  startLogin(state) {
    state.loginError = false;
    state.loginErrorMessage = '';
  },
  loadTopic(state) {
    state.singleTopicLoad = true;
    state.singleTopicError = false;
    state.singleTopic = {};
  },
  errorTopic(state) {
    state.singleTopicError = true;
    state.singleTopicLoad = false;
  },
  singleTopic(state, data) {
    state.singleTopicLoad = false;
    state.singleTopicError = false;
    state.singleTopic = data;
  },
  logout(state) {
    state.currentUser = {};
  },
};

export const getters = {
  isAuth: state => !!state.currentUser.id,
  userId: state => state.currentUser.id,
  getTopics: state => state.topics.sort((a, b) => b.votes - a.votes),
  singleTopic: state => state.singleTopic,
};
export const state = {
  authenticated: false,
  authError: false,
  topics: [],
  currentUser: {},
  error: false,
  topicLoad: false,
  loginError: false,
  loginErrorMessage: '',
  singleTopic: {},
  singleTopicError: {},
  singleTopicLoad: {},
  registerError: {},
};

export const actions = {
  socket_newTopic(context, topic) {
    context.commit('addTopic', topic);
  },
  socket_votesChanged(context) {
    return new Promise(resolve =>
      axios({
        method: 'get',
        url: `${apiHost}/api/topics`,
        headers: {
          USER_ID: context.getters.userId,
        },
      }).then(
        (response) => {
          context.commit('updateTopics', response.data);
          resolve();
        },
        error => context.commit('errorTopic', error),
      ),
    );
  },
  register(context, user) {
    return new Promise(resolve =>
      axios({ url: `${apiHost}/api/register`, method: 'post', data: { ...user } }).then(
        (response) => {
          context.commit('updateUser', response.data);
          resolve();
        },
        error => context.commit('errorRegister', error.response.data),
      ),
    );
  },
  login(context, user) {
    return new Promise((resolve) => {
      context.commit('startLogin');
      return axios({ url: `${apiHost}/api/login`, method: 'post', data: { ...user } }).then(
        (response) => {
          context.commit('updateUser', response.data);
          resolve();
        },
        error => context.commit('errorLogin', error.response.data),
      );
    });
  },
  loginReset(context) {
    context.commit('startLogin');
  },
  getAllTopics(context) {
    context.commit('loadTopics');
    return new Promise(resolve =>
      axios({
        method: 'get',
        url: `${apiHost}/api/topics`,
        headers: {
          USER_ID: context.getters.userId,
        },
      }).then(
        (response) => {
          context.commit('updateTopics', response.data);
          resolve();
        },
        (error) => {
          context.commit('errorTopic', error);
          resolve();
        },
      ),
    );
  },
  vote(context, { id }) {
    return new Promise(() =>
      axios({
        method: 'get',
        url: `${apiHost}/api/topics/${id}/vote`,
        headers: {
          USER_ID: context.getters.userId,
        },
      }),
    );
  },
  addTopic(context, topic) {
    context.commit('savingTopic');
    return new Promise(resolve =>
      axios({
        method: 'post',
        url: `${apiHost}/api/topics`,
        data: { ...topic },
        headers: {
          USER_ID: context.getters.userId,
        },
      }).then(
        (response) => {
          context.commit('addedTopic', response.data);
          resolve();
        },
        (error) => {
          context.commit('errorSaveTopic', error);
          resolve();
        },
      ),
    );
  },
  getTopic(context, id) {
    context.commit('loadTopic');
    return new Promise(resolve =>
      axios({
        method: 'get',
        url: `${apiHost}/api/topics/${id}`,
        headers: {
          USER_ID: context.getters.userId,
        },
      }).then(
        (response) => {
          context.commit('singleTopic', response.data);
          resolve();
        },
        (error) => {
          context.commit('errorGettingTopic', error);
          resolve();
        },
      ),
    );
  },
  addComment(context, comment) {
    return new Promise(resolve =>
      axios({
        method: 'post',
        url: `${apiHost}/api/comments`,
        data: { ...comment },
        headers: {
          USER_ID: context.getters.userId,
        },
      })
        .then((response) => {
          context.dispatch('getTopic', response.data.topic_id);
          resolve();
        })
        .catch((error) => {
          context.commit('errorSaveComment', error);
          resolve();
        }),
    );
  },
  logout(context) {
    context.commit('logout');
  },
};
const store = new Vuex.Store({
  actions,
  getters,
  mutations,
  state,
});
store.subscribe((mutation, stte) => {
  // Store the state object as a JSON string
  localStorage.setItem('storeHack', JSON.stringify(stte));
});
export default store;
