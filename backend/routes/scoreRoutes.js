const express = require('express');
const router = express.Router();
const Score = require('../models/Score');

router.post('/submit', async (req, res) => {
  try {
    const { userName, score } = req.body;
    const newScore = new Score({ userName, score });
    await newScore.save();
    res.status(201).json({ message: 'Score saved!' });
  } catch (error) {
    res.status(500).json({ error: 'Error saving score' });
  }
});

module.exports = router;
