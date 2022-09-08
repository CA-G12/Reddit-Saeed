const connection = require('../../config/connection')

module.exports = (title, content, user_id) =>
    connection.query(
        'INSERT INTO posts(title ,content, user_id) values($1,$2,$3) RETURNING *',
        [title, content, user_id]
    )
