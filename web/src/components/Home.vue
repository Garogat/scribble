<template>
  <div class="home">
    <div class="join">
      <input type="text" v-model="name" @keyup.enter="join" class="join-name" placeholder="Choose your name ...">
      <div v-if="error" class="join-error">{{ error }}</div>
      <button @click="join" class="join-play">Play!</button>
    </div>
    <div class="info">
      <p>
        Hello!

        We added:
        New Languages: Italian, Estonian, Korean, Hungarian and Tagalog.
        More player support with up to 12 players in private rooms!
        Custom words in private rooms.
        Custom drawing time in private rooms.
        Please check out the new languages and report any spelling issues if you like!

        Thanks.
      </p>
    </div>
  </div>
</template>

<script>
import api from '@/api';
import Store from '@/store';
import { LOBBY_JOIN } from '@/store/actions.type';

export default {
  name: 'home',
  components: {
  },
  data () {
    return {
      error: null,
      name: '',
    }
  },
  methods: {
    join() {
      this.error = null;
      if (!this.name) {
        this.error = 'Everyone need a name!';
        return;
      }

      Store.dispatch(LOBBY_JOIN, {
          lobbyId: 'abc',
          username: this.name,
        });
    },
  },
  beforeMount() {
  },
}
</script>

<style>
.home {
  display: flex;
  flex-flow: row;
  justify-content: space-around;
  width: 100%;
}

.home .join,
.home .info {
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  width: 40%;
  padding: 2rem;
  background: #fff;
  box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.2);
}

.home .join .join-name {
  height: 2rem;
  padding: .25rem .5rem;
  font-size: 14px;
  color: #555;
  background-color: #fff;
  border: 1px solid #ccc;
  box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
  transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
}
.home .join .join-name:focus {
  outline: none;
}

.home .join .join-play {
  margin-top: auto;
  padding: 10px 16px;
  font-size: 18px;
  border-radius: 6px;
  font-weight: 400;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
}
.home .join .join-play:focus {
  outline: 0;
}

.home .join .join-error {
  margin-top: 1rem;
  color: red;
}
</style>
