const express = require('express');
const app = express();

// Route: GET /
app.get('/', (req, res) => {
  res.status(200).send('Hello, World!');
});

// 404 handler for unknown routes
app.use((req, res) => {
  res.status(404).send('Not Found');
});

module.exports = app; // Export for testing
