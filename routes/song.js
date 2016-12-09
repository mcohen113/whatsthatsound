const express = require('express');
const path = require('path');
const { getAllSongs, addSong } = require('../model/songs');
// const router = require('express').Router();

const songRouter = express.Router();

songRouter.get('/', getAllSongs, (req, res) => {
  res.json({
    songs: res.songs
  });
});

songRouter.post('/', addSong, (req, res) => {
  res.json({
    song: res.song
  });
});

module.exports = songRouter;
