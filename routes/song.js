const express = require('express');
const path = require('path');
// const router = require('express').Router();

const songRouter = express.Router();

songRouter.get('/', (req, res) => {
res.sendFile(path.resolve(__dirname, '../views', 'index.html'))
  // res.render('song');
});

// const renderSongPage = (req,res) => {
//   res.render('song', {
//     songs: res.songs || [],
//     saved: res.saved || []
//   });
// };
// router.get('/');

module.exports = songRouter;
