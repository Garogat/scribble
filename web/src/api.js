const EventEmitter = require('wolfy87-eventemitter');

const url = 'ws://localhost:3000';

let ws;
let emitter;

function on(event, listner) {
  return emitter.addListener(event, listner);
}

function emit(event, ...args) {
  return emitter.trigger(event, args);
}

function removeListener(event, listner) {
  return emitter.removeListener(event, listner);
}

function connect() {
  ws = new WebSocket(url);

  ws.onopen = () => {
    console.log('[Websocket] connected');
    emit('state', { state: 'open' });
  };

  ws.onmessage = ({ data }) => {
    console.log('[WebSocket] <', data);
    try {
      const { type, payload } = JSON.parse(data);
      emit(type, payload);
    } catch (ignore) {
      console.error(ignore);
      emit('undefined', data);
    }
  };

  ws.onclose = () => {
    emit('state', { state: 'close' });
    setTimeout(() => {
      connect();
    }, 1000);
  };

  ws.onerror = () => {
    ws.close();
  };
}

function send(arg1, arg2) {
  if (!ws) {
    return;
  }

  let type;
  let payload;

  if (arg1 && typeof arg1 === 'string') {
    type = arg1;
    payload = arg2 || {};
  }

  if (typeof type === 'object') {
    ({ type, payload } = arg1);
  }

  if (type && typeof type === 'string' && payload) {
    let json = '';
    try {
      json = JSON.stringify({ type, payload });
    } catch (error) {
      console.error(`[Websocket] error: ${error}`);
    }

    console.log('[Websocket] >', json);
    ws.send(json);
  }
}

function init() {
  emitter = new EventEmitter();

  on('undefined', (msg) => {
    console.log('[Websocket] unknown packet: ', msg);
  });

  connect();
}

function isConnected() {
  return !!ws && ws.readyState === WebSocket.OPEN;
}

export default {
  init,
  send,
  on,
  emit,
  removeListener,
  isConnected,
};
