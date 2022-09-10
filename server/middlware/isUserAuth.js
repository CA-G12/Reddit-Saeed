const custumError = require('../custumError')
const jwt = require('jsonwebtoken')
module.exports = (req, res, next) => {
    try {
        const token = req.cookies.token

        console.log(token)
        if (!token) {
            throw custumError('Unauthorized', 401)
        } else {
            let decoded = jwt.verify(token, process.env.SECERT_KEY)

            console.log(decoded)
            req.userId = decoded.id
            next()
        }
    } catch (err) {
        next(err)
    }
}
