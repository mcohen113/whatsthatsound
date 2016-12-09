const db = require('./db');

function getAllSongs(req, res, next) {
  db.any('SELECT * from songs;')
    .then(songs => {
      res.songs = songs;
      next();
    })
    .catch(error => next(error));
}

module.exports = { getAllSongs };



