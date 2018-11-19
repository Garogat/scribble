module.exports = ({ on }) => {
  on('lobby:join', (client, payload) => {
    client.lobby = payload.lobby;
    client.user = payload.name;
    client.sendLobby('lobby:joined', {
      user: {
        name: payload.name,
      },
    });
  });

  on('lobby:chat', (client, payload) => {
    if (client.lobby) {
      client.sendLobby('lobby:chat', {
        user: client.user,
        body: payload,
      });
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
