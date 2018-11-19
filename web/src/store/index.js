import Vue from 'vue';
import Vuex from 'vuex';

import lobby from '@/store/lobby.module';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    lobby,
  },
});
