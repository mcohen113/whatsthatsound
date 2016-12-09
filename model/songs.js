const db = require('./db');

function getAllSongs(req, res, next) {
  db.any('SELECT * from songs;')
    .then(songs => {
      res.songs = songs;
      next();
    })
    .catch(error => next(error));
}

function addSong(req, res, next) {
  db.one(`INSERT INTO songs (title, content)
          VALUES ($/title/, $/content/)
          RETURNING *;
          `, req.body)
    .then(song => {
      res.song = song;
      next();
    })
    .catch(error => next(error));
}

module.exports = { getAllSongs, addSong };

