const express = require('express');
const router = require('express').Router();

const songRouter = express.Router();

songRouter.get('/', (req, res) => {
  res.render('song');
});


module.exports = router;
