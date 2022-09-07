const connection = require('../../config/connection')

module.exports = (username, email, avatar, password) =>
    connection.query(
        'INSERT INTO users(username ,email, avatar, password) values($1,$2,$3,$4) RETURNING *',
        [username, email, avatar, password]
    )
