const pgp = require('pg-promise')();

const config = process.env.DATABASE_URL || {
  host:       'localhost',
  port:       '5432',
  database:   'whatsthatsound',
  user:       'mike',
  password:   'prices3'
};

const db = pgp(config);
const query = db.query(
  'Create table songs(id SERIAL PRIMARY KEY, title VARCHAR, content TEXT not null)'
);

module.exports = db;
