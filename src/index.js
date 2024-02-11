const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { connect, close } = require('./db');
const bodyParser = require('body-parser');
const agentRoutes = require('./routes/agentRoute');
const playerRoutes = require('./routes/playerRoutes');

connect();

const app = express();

const PORT = process.env.PORT || 8000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use('/api', agentRoutes);
app.use('/api', playerRoutes);
// Start the server

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

process.on('SIGINT', async () => {
    await close();
    process.exit();
  });
  
  process.on('SIGTERM', async () => {
    await close();
    process.exit();
  });


