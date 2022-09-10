const { deletePost, getPost } = require('../../database/queries/posts')
const custumError = require('../../custumError')

module.exports = (req, res, next) => {
    try {
        const id = req.params.id
        getPost(id)
            .then((data) => {
                if (data.rows.length === 0) {
                    throw custumError('not found', 404)
                } else {
                    if (req.userId !== data.rows[0].user_id) {
                        throw custumError('Unauthorized', 401)
                    }
                }
            })
            .then(() => {
                return deletePost(id)
            })
            .then((data) => {
                //delete status code
                res.status(201).json(data.rows[0])
            })
            .catch((err) => next(err))
    } catch (err) {
        next(err)
    }
}
