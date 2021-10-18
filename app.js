const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config({ path: './config.env' });
const dbo = require('./db/conn');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
var allowCrossDomain = function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
};

app.use(allowCrossDomain);

const snippetsRouter = require('./routes/snippets.routes');
const tasksRouter = require('./routes/tasks.routes');

app.use('/', snippetsRouter);
app.use('/', tasksRouter);
app.get('/', (req, res) => {
  res.json({ message: 'hello world' });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  dbo.connectToServer(function (err) {
    if (err) console.error(err, 'heyo');
  });
  console.log(`Server started on port ${PORT}`);
});
