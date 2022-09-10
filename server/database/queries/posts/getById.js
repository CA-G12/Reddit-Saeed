const connection = require('../../config/connection')

module.exports = (id) =>
    connection.query('select * from posts where id = $1;', [id])
