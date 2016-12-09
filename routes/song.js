const express = require('express');
const path = require('path');
const router = express.Router();
const { getAllSongs } = require('../model/songs');
// const router = require('express').Router();

const songRouter = express.Router();

songRouter.get('/', (req, res) => {
res.sendFile(path.resolve(__dirname, '../views', 'index.html'))
  // res.render('song');
});

router.get('/', getAllSongs, (req, res) => {
  res.json({
    songs: res.songs || []
  });
});

module.exports = songRouter;
