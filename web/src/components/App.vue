<template>
  <div id="app">
    <h1>You guess or you know?</h1>
    <template v-if="state==='open'">
      <template v-if="lobbyId">
        <Lobby></Lobby>
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
import api from '@/api';
import { mapGetters } from 'vuex';
import Home from '@/components/Home';
import Lobby from '@/components/Lobby';

export default {
  name: 'app',
  components: {
    Home,
    Lobby,
  },
  data () {
    return {
      state: null,
    }
  },
  computed: {
    ...mapGetters([
      'lobbyId',
   ]),
  },
  beforeMount() {
    api.on('state', ({ state }) => {
      this.state = state;
    });
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
