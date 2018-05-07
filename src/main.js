// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Vuetify from 'vuetify';
import VueSocketio from 'vue-socket.io-extended';
import socketio from 'socket.io-client';

import App from './App';
import router from './router';

import store from './store';

const socket = socketio('http://localhost:8080');

Vue.use(Vuetify);
Vue.use(VueSocketio, socket, store);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  beforeCreate() {
    this.$store.commit('initialiseStore');
  },
  template: '<App/>',
});
