<template>
  <div class="chat">
    <div class="messages">
      <div v-for="message in messages" :class="{ message, muted: message.muted }">
        <template v-if="message.user">
          <div class="message-user">{{ message.user }}:</div>
          <div class="message-body">{{ message.body }}</div>
        </template>
        <template v-else>
          <div :class="systemMessage(message.action)">{{ message.body }}</div>
        </template>
      </div>
    </div>
    <input type="text" v-model="input" @keyup.enter="send" class="input" placeholder="Type your guess here ...">
  </div>
</template>

<script>
import api from '@/api';
import { mapGetters } from 'vuex';

export default {
  name: 'chat',
  data () {
    return {
      input: '',
      messages: [],
    }
  },
  computed: {
    ...mapGetters([
      'username',
    ])
  },
  methods: {
    send() {
      if (this.input !== '') {
        api.send('chat', this.input);
        this.input = '';
      }
    },
    systemMessage(action) {
      let classes = {
        'message-system': true,
      };
      classes[action] = true;
      return classes;
    },
  },
  beforeMount() {
    api.on('chat', msg => {
      this.messages.push(msg);
      // TODO: scroll to bottom
    });

    api.on('lobby:joined', ({ user }) => {
      if (user.name === this.username) {
        return;
      }
      this.messages.push({
        action: 'join',
        body: user.name + ' joined.',
      });
    });

    api.on('lobby:left', ({ user }) => {
      this.messages.push({
        action: 'left',
        body: user.name + ' left!',
      });
    });
  },
}
</script>

<style>
.chat {
  display: flex;
  flex-flow: column;
  width: 40%;
  margin-left: 2rem;
  background: #fff;
  box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.2);
}

.chat .messages-wrapper {
  position: relative;
  width: 100%;
  height: 100%;

}

.chat .messages {
  overflow-y: auto;
}

.chat .message {
  padding: .5rem;
  display: flex;
}

.chat .message:nth-child(2n) {
  background: #ccc;
}

.chat .message .message-user {
  font-weight: bold;
}

.chat .message .message-body {
  margin-left: .5rem;
}

.chat .message .message-system {
  color: yellow;
}
.chat .message .message-system.join {
  color: blue;
}
.chat .message .message-system.left {
  color: red;
}
.chat .message .message-system.info {
  color: orange;
}
.chat .message .message-system.guessed {
  color: green;
}

.chat .message.muted .message-user {
  color: orange;
}
.chat .message.muted .message-body {
  color: orange;
}

.chat .input {
  margin-top: auto;
  display: block;
  height: 2rem;
  padding: .25rem .5rem;
  font-size: 14px;
  line-height: 1.42857143;
  color: #555;
  background-color: #fff;
  background-image: none;
  border: 0;
  box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
  transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
}
.chat .input:focus {
  outline: none;
}
</style>
