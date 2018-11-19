<template>
  <div class="leaderboard">
    <div class="users">
      <div v-for="user in users" class="user">
        <div class="user-name">{{ user.name }}</div>
        <div class="user-body">{{ user.score }}</div>
        <div v-if="user.drawing" class="user-drawing">pen</div>
        <div v-else class="user-guessing">guessing</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'leaderboard',
  components: {
  },
  data () {
    return {
      users: [
        {
          name: 'anton',
          score: 1000,
          drawing: true,
        }
      ],
    }
  },
  methods: {
  },
  beforeMount() {
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
}

.leaderboard .user {
  display: flex;
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
