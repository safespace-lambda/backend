const express = require('express');

const cors = require('cors');
const helmet = require('helmet');

const userRouter = require('./userRouter');
const authRouter = require('./authRouter');

const restricted = require('../middleware/restricted');
const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use('/api/users', restricted, userRouter);
server.use('/api/auth', authRouter);

//sanity check
server.get('/', (req, res) => {
  res.status(200).json({ message: 'Hey dont worrie you are in a safe space' });
});

module.exports = server;
