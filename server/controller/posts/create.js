const { createPost } = require('../../database/queries/posts')
const { postSchema } = require('../../validation')
const custumError = require('../../custumError')

module.exports = (req, res, next) => {
    try {
        const { title, content } = req.body
        const userId = req.userId
        if (userId === undefined) {
            //!! status code
            throw custumError('unauthrized ', 403)
        }
        const { error } = postSchema.validate({ title, content })
        if (error) {
            throw custumError(error, 422)
        } else {
            createPost(title, content, userId)
                .then((post) => {
                    res.json(post.rows[0])
                })
                .catch((err) => {
                    next(err)
                })
        }
    } catch (err) {
        next(err)
    }
}
