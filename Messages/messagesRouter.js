const express = require('express');

const router = express();
const Messages = require('./messagesModel');

router.use(express.json());

router.get('/', async (req, res) => {
  try {
    const message = await Messages.findByUserId(req.headers.id);
    const currentUserId = req.decodedToken.subject;
    if (req.headers.id != currentUserId) {
      res.status(401).json({ error: 'Stop trying to snoop!' });
    } else {
      if (message === undefined) {
        res.status(404).end();
      } else {
        res.status(200).json(message);
      }
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post('/', async (req, res) => {
  const { body } = req.body;
  const user_id = req.decodedToken.subject;
  if (!body) {
    return res.status(422).json({ error: 'Missing required data' });
  } else {
    try {
      const message = await Messages.add({ ...req.body, user_id });

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

router.put('/:id', async (req, res) => {
  const currentUserId = req.decodedToken.subject;
  if (req.headers.id != currentUserId) {
    res.status(401).json({ error: 'Stop trying to snoop!' });
  } else {
    try {
      const message = await Messages.update(req.params.id, req.body);
      res.status(200).json(message);
    } catch (error) {
      res.status(500).json(error);
    }
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
