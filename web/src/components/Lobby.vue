<template>
  <div class="lobby">
    <header class="lobby-header">
      <TopBar></TopBar>
    </header>
    <div class="lobby-body">
      <LeaderBoard></LeaderBoard>
      <Whiteboard></Whiteboard>
      <Chat></Chat>
    </div>
  </div>
</template>

<script>
import api from '@/api';
import Store from '@/store';
import { mapGetters } from 'vuex';
import Chat from '@/components/game/Chat';
import LeaderBoard from '@/components/game/LeaderBoard';
import TopBar from '@/components/game/TopBar';
import Whiteboard from '@/components/game/Whiteboard';

export default {
  name: 'lobby',
  components: {
    Chat,
    LeaderBoard,
    TopBar,
    Whiteboard,
  },
  computed: {
    ...mapGetters([
      'lobbyId',
      'username',
    ])
  },
  beforeMount() {
    api.send('lobby:join', {
      lobby: this.lobbyId,
      name: this.username,
    });
  },
}
</script>

<style>
.lobby {
  display: flex;
  flex-flow: column;
  justify-content: space-around;
  width: 100%;
  height: 100%;
  max-width: 1600px;
  max-height: 800px;
}

.lobby .lobby-header {
  width: 100%;
}

.lobby .lobby-body {
  display: flex;
  width: 100%;
  height: 100%;
}
</style>
