<template>
  <div class="leaderboard">
    <div class="users">
      <div v-for="user in users" class="user">
        <div class="user-name">{{ user.name }}</div>
        <div class="user-score">{{ user.score }}</div>
        <div class="user-mode">{{ user.mode }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/api';

export default {
  name: 'leaderboard',
  data() {
    return {
      users: [],
    };
  },
  beforeMount() {
    api.on('lobby:joined', ({ user }) => {
      // TODO: if user not already added
      if (this.users) {
        this.users.push(user);
      }
    });

    api.on('lobby:left', ({ user }) => {
      // TODO: remove user
    });
  },
}
</script>

<style>
.leaderboard {
  display: flex;
  flex-flow: column;
  width: 30%;
  margin-right: 2rem;
  background: #fff;
  box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.2);
}

.leaderboard .users {
  display: flex;
  flex-wrap: wrap;
}

.leaderboard .user {
  display: flex;
  width: 100%;
  padding: .5rem;
  justify-content: space-between;
  border-bottom: 1px solid #ccc;
}

.leaderboard .user .user-name {
  font-weight: bold;
}

.leaderboard .user .user-score {
  color: gold;
}

.leaderboard .user .user-darwing {
  background: red;
  width: 2rem;
}

.leaderboard .user .user-guessing {
  background: blue;
  width: 2rem;
}

</style>
