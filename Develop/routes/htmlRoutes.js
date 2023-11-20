// The express module is imported and assigned to the express variable.

const express = require('express');
const router = express.Router();
const path = require('path');

// the HTML routes are defined using the router.get() method
router.get('/notes', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../public/notes.html'));
});

router.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../public/index.html'));
});

//  The router is exported using module.exports so that it can be used in other  application

module.exports = router;
