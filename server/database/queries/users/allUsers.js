const connection = require('../../config/connection');

module.exports = () =>
  connection.query('SELECT username, avatar, email FROM users;');
