const express = require('express');

const cors = require('cors');
const helmet = require('helmet');

const authRouter = require('../Auth/authRouter');
const messagesRouter = require('../Messages/messagesRouter');

const restricted = require('../middleware/restricted');
const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use('/api/auth', restricted, authRouter);
server.use('/api/messages', messagesRouter);

//sanity check
server.get('/', (req, res) => {
  res.status(200).json({ message: 'Hey dont worry you are in a safe space' });
});

module.exports = server;
