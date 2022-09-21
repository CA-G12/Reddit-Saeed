const connection = require('../../config/connection');

module.exports = (id) => {
  return connection.query(
    'select posts.id, posts.title, posts.content from posts join users on posts.user_id = users.id where users.id = $1  ;',
    [id]
  );
};
