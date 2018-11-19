module.exports = ({ on }) => {
  on('lobby:join', (client, payload) => {
    client.lobby = payload.lobby;
    client.user = payload.name;
    client.sendLobby('lobby:joined', {
      user: {
        name: payload.name,
        score: 0,
      },
    });
  });

  on('lobby:chat', (client, payload) => {
    client.sendLobby('lobby:chat', {
      user: client.user,
      body: payload,
    });
  });

  on('appointment:delete', (client, payload) => {
    client.sendPacket('dump', payload);
  });
};
