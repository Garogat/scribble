const events = require('events');

const Lobby = require('./lobby');

let emitter;

const middlewares = {};

function emit(client, event, payload) {
  emitter.emit(event, client, payload);
}

function on(event, listener) {
  return emitter.on(event, listener);
}

function init() {
  emitter = new events.EventEmitter();

  on('undefined', (packet) => {
    console.error(`[Websocket] dropped packet: ${packet}`);
  });

  const ctx = { on };
  Lobby(ctx);
}

module.exports = {
  init,
  emit,
  on,
};
