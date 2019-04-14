const express = require('express');
const db = require('../config/dbConfig');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const users = await db('users');
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: `Error in retrieving users: ${error}` });
  }
});

module.exports = router;
