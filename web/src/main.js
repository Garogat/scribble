import Vue from 'vue';
import App from './components/App.vue';
import store from './store';
import api from './api.js';

Vue.config.productionTip = false;

api.init();

new Vue({
  el: '#app',
  store,
  render: h => h(App),
});
