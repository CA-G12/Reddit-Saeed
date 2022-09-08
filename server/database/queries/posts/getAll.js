const connection = require('../../config/connection')

module.exports = () => {
    return connection.query('select * from posts;')
}
