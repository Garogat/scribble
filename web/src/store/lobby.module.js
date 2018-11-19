import {
  LOBBY_JOIN,
} from './actions.type';

import {
  LOBBY_SET_ID,
  LOBBY_ADD_USER,
  USER_SET,
} from './mutations.type';

import api from '@/api';

const getters = {
  username: state => state.username,
  lobby: state => state.lobby,
  lobbyId: state => state.lobbyId,
};

const mutations = {
  [LOBBY_SET_ID](state, { lobbyId }) {
    state.lobbyId = lobbyId;
    localStorage.setItem('lobby_id', lobbyId);
  },
  [USER_SET](state, { username }) {
    state.username = username;
    localStorage.setItem('username', username);
  },
};

const actions = {
  [LOBBY_JOIN]({ commit }, { lobbyId, username }) {
    return new Promise((resolve) => {
      commit(LOBBY_SET_ID, { lobbyId });
      commit(USER_SET, { username });
      resolve();
    });
  },
};

const state = {
  lobby: {},
  lobbyId: localStorage.getItem('lobby_id') || '',
  username: localStorage.getItem('username') || '',
};

export default {
  state,
  actions,
  mutations,
  getters,
};
