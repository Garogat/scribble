const express = require('express');
const path = require('path');
const websocket = require('./websocket');

require('dotenv').config();

const app = express();

app.use('/dist', express.static(path.join(__dirname, 'web', 'dist')));

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'web', 'index.html'));
});

app.on('error', err => {
  log.error('server error', err)
});

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log(`Server listening on port ${port}!`);
  websocket.init(server);
});
