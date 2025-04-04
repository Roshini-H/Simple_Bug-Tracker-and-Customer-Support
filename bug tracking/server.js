// server.js
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());
// Serve static files from the 'public' directory (if you place index.html, style.css, and script.js there)
app.use(express.static('public'));

// In-memory storage for bugs and chat messages
let bugs = [];
let chatMessages = [];

/**
 * POST /api/bugs
 * Endpoint to create a new bug report.
 */
app.post('/api/bugs', (req, res) => {
  const { title, description, severity } = req.body;
  if (!title || !description || !severity) {
    return res.status(400).json({ error: 'Missing required fields: title, description, or severity.' });
  }

  const bug = {
    id: Date.now(),
    title,
    description,
    severity,
    status: 'Open'
  };

  bugs.push(bug);
  res.status(201).json(bug);
});

/**
 * GET /api/bugs
 * Endpoint to retrieve all bug reports.
 */
app.get('/api/bugs', (req, res) => {
  res.json(bugs);
});

/**
 * POST /api/chat
 * Endpoint to send a new chat message.
 */
app.post('/api/chat', (req, res) => {
  const { sender, message } = req.body;
  if (!sender || !message) {
    return res.status(400).json({ error: 'Missing required fields: sender or message.' });
  }

  const chatMessage = {
    id: Date.now(),
    sender,
    message
  };

  chatMessages.push(chatMessage);
  res.status(201).json(chatMessage);
});

/**
 * GET /api/chat
 * Endpoint to retrieve all chat messages.
 */
app.get('/api/chat', (req, res) => {
  res.json(chatMessages);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
