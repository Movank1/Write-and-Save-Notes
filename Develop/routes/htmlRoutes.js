

const express = require('express');
const router = express.Router();
const path = require('path');

// Define the HTML routes
router.get('/notes', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../public/notes.html'));
});

router.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../public/index.html'));
});

module.exports = router;
