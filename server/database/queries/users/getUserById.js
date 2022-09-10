const connection = require('../../config/connection');

module.exports = (id) =>
  connection.query('SELECT username, avatar, email FROM users WHERE id = $1;', [
    id,
  ]);
