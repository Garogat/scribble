module.exports = ({ on }) => {

  on('lobby:join', (client, payload) => {
    client.lobby = payload.lobby;
    // TODO: check if user exists
    client.user = payload.name;
    client.sendLobby('lobby:joined', {
      user: {
        name: payload.name,
        score: 0,
      },
    });

    // TODO: send lobby users
    client.sendPacket('lobby:users', { users: [] });

    // TODO: send word
    client.sendPacket('lobby:word', { word: ['', '', 'b', '', ''] });

    // TODO: send time left
    client.sendPacket('lobby:timeleft', { timeLeft: 180 });
  });

  on('chat', (client, payload) => {
    if (client.lobby) {
      // TODO: spam guard!!!
      // TODO: check word guessing
      // TODO: check muted (guessed word this round)
      client.sendLobby('chat', {
        user: client.user,
        body: payload,
      });
    }
  });


  // TODO: don't send to drawer
  on('draw:point', (client, payload) => {
    if (client.lobby) {
      client.sendLobby('draw:point', payload);
    }
  });

  // TODO: don't send to drawer
  on('draw:undo', (client, payload) => {
    if (client.lobby) {
      client.sendLobby('draw:undo', payload);
    }
  });

  on('close', (client) => {
    if (client.lobby) {
      client.sendLobby('lobby:left', {
        user: {
          name: client.user
        },
      });
    }
  });
};
