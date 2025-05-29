const mongoose = require('mongoose');

const ScoreSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  score: { type: Number, required: true },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Score', ScoreSchema);