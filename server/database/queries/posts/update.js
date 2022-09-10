const connection = require('../../config/connection');

module.exports = (id, title, content) =>
  connection.query(
    'UPDATE posts SET title=$1, content=$2 where id=$3 RETURNING *;',
    [title, content, id]
  );
