const ws = require('ws');
const Packets = require('./packets');

let wss;

function sendLobby(lobby, type, payload) {
  console.log(type, payload);
  wss.clients.forEach((client) => {
    if (client.readyState === ws.OPEN && client.lobby === lobby) {
      client.sendPacket(type, payload);
    }
  });
}

function broadcast(type, payload) {
  wss.clients.forEach((client) => {
    if (client.readyState === ws.OPEN) {
      client.sendPacket(type, payload);
    }
  });
}

function sendPacket(client, arg1, arg2) {
  let type;
  let payload;

  if (arg1 && typeof arg1 === 'string') {
    type = arg1;
    payload = arg2 || {};
  }

  if (typeof type === 'object' && type.type && type.payload) {
    ({ type, payload } = arg1);
  }

  if (type && typeof type === 'string' && payload) {
    let json = '';
    try {
      json = JSON.stringify({ type, payload });
    } catch (error) {
      console.err(`[Websocket] error: ${error}`);
    }

    console.log(`[Websocket] < ${json}`);
    client.send(json);
  }
}

function init(server) {
  wss = new ws.Server({ server });
  Packets.init();

  wss.on('connection', (ws) => {
    console.log('[Websocket] Client connected');

    ws.on('message', (msg) => {
      try {
        const { type, payload } = JSON.parse(msg);
        Packets.emit(ws, type, payload);
        console.log(`[Websocket] > ${type}`);
      } catch (ignore) {
        Packets.emit('undefined', msg);
        console.error(ignore);
      }
    });

    ws.sendPacket = (...args) => {
      sendPacket(ws, ...args);
    };

    ws.sendLobby = (...args) => {
      if (ws.lobby) {
        sendLobby(ws.lobby, ...args);
      }
    };

    ws.on('close', () => {
      console.log('[Websocket] Client disconnected');
    });
  });
}

module.exports = {
  init,
  sendLobby,
  broadcast,
};
