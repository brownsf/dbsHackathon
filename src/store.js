import Vuex from 'vuex';
import Vue from 'vue';

import axios from 'axios';

Vue.use(Vuex);
const apiHost = 'http://localhost:8080';

const store = new Vuex.Store({
  state: {
    authenticated: false,
    authError: false,
    topics: [],
    currentUser: {},
    error: false,
    topicLoad: false,
  },
  getters: {
    isAuth: state => state.authenticated,
    userId: state => state.currentUser.id,
  },
  mutations: {
    initialiseStore(state) {
      console.log(localStorage.getItem('storeHack'));
      // Check if the ID exists
      if (localStorage.getItem('storeHack')) {
        console.log(localStorage.getItem('storeHack'));
        // Replace the state object with the stored item
        this.replaceState(Object.assign(state, JSON.parse(localStorage.getItem('storeHack'))));
      }
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
      state.topicLoad = true;
      state.topicError = false;
    },
    errorTopics(state) {
      state.topicError = true;
      state.topicLoad = false;
    },
  },
  actions: {
    register(context, user) {
      return new Promise(resolve =>
        axios.post(`${apiHost}/api/register`, user).then(
          (response) => {
            context.commit('updateUser', response.data);
            resolve();
          },
          error => context.commit('errorRegister', error),
        ),
      );
    },
    login(context, user) {
      return new Promise(resolve =>
        axios.post(`${apiHost}/api/login`, user).then(
          (response) => {
            context.commit('updateUser', response.data);
            resolve();
          },
          error => context.commit('errorLogin', error),
        ),
      );
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
          error => context.commit('errorTopic', error),
        ),
      );
    },
    addTopic(context, topic) {
      context.commit('savingTopic');
      return new Promise(resolve =>
        axios({
          method: 'post',
          url: `${apiHost}/api/topics`,
          body: { topic },
          headers: {
            USER_ID: context.getters.userId,
          },
        }).then(
          (response) => {
            context.commit('addedTopic', response.data);
            resolve();
          },
          error => context.commit('errorSaveTopic', error),
        ),
      );
    },
  },
});
store.subscribe((mutation, state) => {
  // Store the state object as a JSON string
  localStorage.setItem('storeHack', JSON.stringify(state));
});
export default store;
