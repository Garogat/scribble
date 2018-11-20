<template>
  <div class="topbar">
    <div class="timeleft">Time left: {{ timeLeft }} Seconds</div>
    <div class="word">
      <div v-for="letter in word" class="word-letter">
        <span v-if="letter===''">_</span>
        <span v-else>{{ letter }}</span>
      </div>
      <div class="word-length">Length: {{ word.length }}</div>
    </div>
  </div>
</template>

<script>
import api from '@/api';

export default {
  name: 'topbar',
  components: {
  },
  data () {
    return {
      timeLeft: 0,
      word: [],
    }
  },
  methods: {
  },
  beforeMount() {
    api.on('lobby:word', ({ word }) => {
      this.word = word;
    });

    api.on('lobby:timeleft', ({ timeLeft }) => {
      this.timeLeft = timeLeft;
    });
  },
}
</script>

<style>
.topbar {
  display: flex;
  flex-flow: row;
  width: 100%;
  margin-bottom: .5rem;
  padding: .5rem 2rem;
  background: #fff;
  box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.2);
}

.topbar .word {
  display: flex;
  margin-left: auto;
}

.topbar .word .word-letter {
  margin: 0 .5rem;
}

.topbar .word .word-length {
  margin-left: 2rem;
}
</style>
