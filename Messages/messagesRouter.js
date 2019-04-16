const express = require('express');

const router = express();
const Messages = require('./messagesModel');
const restricted = require('../middleware/restricted.js');

router.use(express.json());

router.get('/', restricted, async (req, res) => {
  try {
    const message = await Messages.findByUserId(req.headers.id);
    if (message === undefined) {
      res.status(404).end();
    } else {
      res.status(200).json(message);
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post('/', async (req, res) => {
  const { body, user_id } = req.body;
  if (!user_id || !body) {
    return res.status(422).json({ error: 'Missing required data' });
  } else {
    try {
      const message = await Messages.add(req.body);
      res.status(201).json(message);
    } catch (error) {
      res.status(500).json(error);
    }
  }
});

router.get('/:id', async (req, res) => {
  try {
    const message = await Messages.findById(req.params.id);
    if (message === undefined) {
      res.status(404).end();
    } else {
      res.status(200).json(message);
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const message = await Messages.remove(req.params.id);
    if (!message) {
      res.status(404).end();
    } else {
      res.status(204).end();
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
