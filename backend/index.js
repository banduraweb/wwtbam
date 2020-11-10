require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('./config/config');

const app = express();

app.use(express.json({ extended: true }));

app.use(cors());

const QuestionRoute = require('./routes/question.router');

app.use('/game', QuestionRoute);

const port = config.port() || 8081;
const { connection } = mongoose;

(async () => {
  try {
    await mongoose.connect(config.db(), {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    });
    app.listen(port, () => {
      console.log(`Started..on.port.${port}`);
    });
  } catch (e) {
    console.log('Server error', e.message);
    process.exit(1);
  }
})();

connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});
