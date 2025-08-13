const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

const SAVE_FILE = path.join(__dirname, 'unlocked.json');

app.use(express.json());
app.use(express.static('public')); // serve your frontend from /public folder

// Endpoint to get saved unlocked nodes
app.get('/api/unlocked', (req, res) => {
  if (fs.existsSync(SAVE_FILE)) {
    const data = fs.readFileSync(SAVE_FILE);
    res.json(JSON.parse(data));
  } else {
    res.json([]); // empty array if no save yet
  }
});

// Endpoint to save unlocked nodes
app.post('/api/unlocked', (req, res) => {
  const unlocked = req.body;
  if (Array.isArray(unlocked)) {
    fs.writeFileSync(SAVE_FILE, JSON.stringify(unlocked, null, 2));
    res.json({status: 'ok'});
  } else {
    res.status(400).json({status: 'error', message: 'Invalid data'});
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
