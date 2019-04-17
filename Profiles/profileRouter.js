const express = require('express');

const router = express();
const Profile = require('./profilesModel');

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
  const { name, phone, email } = req.body;
  if (!name || !email) {
    return res.status(422).json({ error: 'Missing required data' });
  } else {
    try {
      const message = await Profile.add(req.body);
      res.status(201).json(message);
    } catch (error) {
      res.status(500).json(error);
    }
  }
});

router.get('/:id', async (req, res) => {
  try {
    const message = await Profile.findById(req.params.id);
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
  try {
    const profile = await Profile.update(req.params.id, req.body);
    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
