import Vue from 'vue';
import App from './components/App.vue';
import store from './store';
import api from './api.js';

Vue.config.productionTip = false;

api.init();

const EventBus = new Vue();
Object.defineProperties(Vue.prototype, {
  $bus: {
    get() {
      return EventBus;
    },
  },
});

new Vue({
  el: '#app',
  store,
  render: h => h(App),
});
