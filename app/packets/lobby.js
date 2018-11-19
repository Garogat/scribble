module.exports = ({ on }) => {
  on('lobby:join', (client, payload) => {
    client.lobby = payload.lobby;
    client.sendLobby('lobby:joined', {
      user: {
        name: payload.name,
        score: 0,
      },
    });
  });

  on('appointment:update', (client, payload) => {
    client.sendPacket('dump', payload);
  });

  on('appointment:delete', (client, payload) => {
    client.sendPacket('dump', payload);
  });
};
