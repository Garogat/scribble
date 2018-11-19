<template>
  <div id="app">
    <h1>You guess or you know?</h1>
    <template v-if="state==='open'">
      <template v-if="lobby">
        <Game></Game>
      </template>
      <template v-else>
        <Home></Home>
      </template>
    </template>
    <template v-else>
      No Connection to Server!
    </template>
  </div>
</template>

<script>
import EventBus from '../event-bus';
import api from '../api.js';

import Game from './Game.vue';
import Home from './Home.vue';

export default {
  name: 'app',
  components: {
    Game,
    Home,
  },
  data () {
    return {
      state: null,
      lobby: false,
    }
  },
  methods: {
    stateListener({ state }) {
      this.state = state;
    },
  },
  beforeMount() {
    api.on('state', this.stateListener);
    EventBus.$on('lobby:joined', (payLoad) => {
      this.lobby = payLoad;
    });
  },
  beforeDestroy() {
    api.removeListener('state', this.stateListener);
  },
}
</script>

<style>
*, *:before, *:after {
  box-sizing: border-box;
}

body, html {
  margin: 0;
}

body {
  display: flex;
  height: 100vh;
  background: #eee;
}

h1 {
  text-align: center;
}

#app {
  display: flex;
  flex-flow: column;
  position: relative;
  height: 100vh;
  width: 100vw;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  box-sizing: border-box;
}
</style>
