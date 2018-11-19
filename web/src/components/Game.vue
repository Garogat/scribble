<template>
  <div class="game">
    <header class="game-header">
      <TopBar></TopBar>
    </header>
    <div class="game-body">
      <LeaderBoard></LeaderBoard>
      <Whiteboard></Whiteboard>
      <Chat></Chat>
    </div>
  </div>
</template>

<script>
import Chat from './game/Chat.vue';
import LeaderBoard from './game/LeaderBoard.vue';
import TopBar from './game/TopBar.vue';
import Whiteboard from './game/Whiteboard.vue';

export default {
  name: 'game',
  components: {
    Chat,
    LeaderBoard,
    TopBar,
    Whiteboard,
  },
  data () {
    return {
    }
  },
  methods: {

  },
  beforeMount() {
  },
}
</script>

<style>
.game {
  display: flex;
  flex-flow: column;
  justify-content: space-around;
  width: 100%;
  height: 100%;
  max-width: 1600px;
  max-height: 800px;
}

.game .game-header {
  width: 100%;
}

.game .game-body {
  display: flex;
  width: 100%;
  height: 100%;
}
</style>
