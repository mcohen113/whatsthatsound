const express = require('express');
const path = require('path');
const { getAllSongs, addSong, deleteSong } = require('../model/songs');
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

songRouter.delete('/:id', deleteSong, (req, res) => {
  res.sendStatus(200)
})

module.exports = songRouter;
