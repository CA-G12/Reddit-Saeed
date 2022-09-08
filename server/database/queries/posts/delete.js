const connection = require('../../config/connection')

module.exports = (id) => {
    return connection.query('DELETE from posts where id = $1;', [id])
}
