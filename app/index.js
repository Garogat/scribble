const express = require('express');
const path = require('path');
const websocket = require('./websocket');

const app = express();

app.use('/dist', express.static('web/dist'));

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'web', 'index.html'));
});

app.on('error', err => {
  log.error('server error', err)
});

const server = app.listen(3000, () => {
  console.log('Server listening on port 3000!');
  websocket.init(server);
});
