<template>
  <div class="chat">
    <div class="messages">
      <div v-for="message in messages" class="message">
        <template v-if="message.user">
          <div class="message-user">{{ message.user }}:</div>
          <div class="message-body">{{ message.body }}</div>
        </template>
        <template v-else>
          <div class="message-system">{{ message.body }}</div>
        </template>
      </div>
    </div>
    <input type="text" v-model="input" @keyup.enter="send" class="input" placeholder="Type your guess here ...">
  </div>
</template>

<script>
import api from '../../api.js';

export default {
  name: 'chat',
  components: {
  },
  data () {
    return {
      input: '',
      messages: [
        {
          user: 'anton',
          body: 'hello',
        },
        {
          user: 'anton',
          body: 'hello',
        },
        {
          user: 'anton',
          body: 'hello',
        },
      ],
    }
  },
  methods: {
    send() {
      api.send('lobby:chat', this.input);
      this.input = '';
    },
    chatListener(msg) {
      this.messages.push(msg);
    }
  },
  beforeMount() {
    api.on('lobby:chat', this.chatListener);
  },
  beforeDestroy() {
    api.removeListener('lobby:chat', this.chatListener);
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

.chat .message {
  padding: .5rem;
  display: flex;
}

.chat .message .message-user {
  font-weight: bold;
}

.chat .message .message-body {
  margin-left: .5rem;
}

.chat .message .message-system.join {
  color: blue;
}

.chat .message .message-system.left {
  color: red;
}

.chat .message .message-system.close {
  color: orange;
}

.chat .message .message-system.guess {
  color: green;
}

.chat .message:nth-child(2n) {
  background: #ccc;
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
