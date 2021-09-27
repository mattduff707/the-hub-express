const express = require('express');
const app = express();
const cors = require('cors');

const snippetsRouter = require('./routes/snippets.routes');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// app.use(express.static(path.join(__dirname, 'build')));

// app.get('/*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });

app.use('/api', snippetsRouter);
app.get('/', (req, res) => {
  res.json({ message: 'hello world' });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
