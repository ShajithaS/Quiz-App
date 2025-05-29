// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const scoreRoutes = require('./routes/scoreRoutes');

const app = express();

app.use(cors());
app.use(express.json());
//app.use('/api/score', scoreRoutes);

mongoose.connect('mongodb+srv://admin:admin@cluster0.bflsedl.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.error(err));

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
