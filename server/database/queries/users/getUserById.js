const connection = require('../../config/connection');

module.exports = (id) =>
  connection.query('SELECT * FROM users WHERE id = $1;', [id]);
