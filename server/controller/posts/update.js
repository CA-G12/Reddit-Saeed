const { getPost, updatePost } = require('../../database/queries/posts')
const { postSchema } = require('../../validation')
const custumError = require('../../custumError')

module.exports = (req, res, next) => {
    try {
        const { title, content } = req.body
        const { id } = req.params
        const { error } = postSchema.validate({ title, content })
        if (error) {
            throw custumError(error, 422)
        } else {
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
                    return updatePost(id, title, content)
                })
                .then((data) => {
                    //delete status code
                    res.status(201).json(data.rows[0])
                })
                .catch((err) => next(err))
        }
    } catch (err) {
        next(err)
    }
}
