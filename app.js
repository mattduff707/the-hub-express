const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
require('dotenv').config({ path: './config.env' });
const dbo = require('./db/conn');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
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
