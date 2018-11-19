import Vue from 'vue';
import App from './App.vue';
import api from './api.js';

api.init();

new Vue({
  el: '#app',
  render: h => h(App),
});
