const express = require('express');
const router = express.Router();
const User = require('../models/userModel');

router.get('/test', (req, res) => {
  res.json({ message: 'Backend is connected!', timestamp: new Date().toISOString() });
});

router.get('/login', (req, res) => {
  res.json({ message: 'Login route' });

});

module.exports = router;

