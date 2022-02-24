const express = require('express');
const jwt = require('jsonwebtoken');
const colors = require('./colors');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post('/auth', (req, res) => {
  const {clientId, name} = req.body;
  if (!clientId || clientId.length < 1) {
    res.status(400).send('Invalid ID');
  }
  if (!name || name.length < 1) {
    res.status(400).send('Invalid name');
  }
  const token = jwt.sign({
    client: clientId,
    channel: 'izEwJATwy5REKqUw',
    permissions: {
      "^observable-locations$": {
        publish: true,
        subscribe: true,
        history: 50,
      }
    },
    data: {
      name,
      color: colors.get()
    },
    exp: Math.floor(Date.now() / 1000) + 60 * 3 // expire in 3 minutes
  }, '4J7zC6NYUCvVdXOoksGy64EihHl4foqM');
  res.send(token);
});

app.listen(3000, () => console.log('Server listening on port 3000'));
