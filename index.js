require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

// Initializing the express application
const app = express();
const PORT = process.env.PORT || 8080;

// in latest body-parser.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json({ limit: '25mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(cors());

const participantsRoutes = require('./routes/participants.js') ;
app.use('/api/participants', participantsRoutes);

app.use('/api/test', (req, res) => {
  res.send(`Hello from the server\n Directory is ${__dirname}`);
});

// Connect to the database before listening
app.listen(PORT, () => {
  console.log(`listening for requests on port: ${PORT}`);
});
