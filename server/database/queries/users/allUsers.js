const connection = require('../../config/connection');

module.exports = () =>
  connection.query('SELECT id, username, avatar, email FROM users;');
