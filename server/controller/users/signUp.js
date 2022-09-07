const { createUser } = require('../../database/queries/users')
const { signUpSchema } = require('../../validation')
const bcrybt = require('bcryptjs')
const custumError = require('../../custumError')
const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    const { username, email, password, confirmPassword, avatar } = req.body
    //validate user info input
    const { error } = signUpSchema.validate({
        username,
        email,
        password,
        confirmPassword,
        avatar,
    })
    if (error) {
        //handle validation errors AS server side validation
        //status 422 Unprocessable Entity
        throw custumError(error, 422)
    } else {
        //contenue sign up operation

        /*
        hash password and store the user information
        in database && create token after
        save the data in database savely
        */
        bcrybt
            .genSalt(10)
            .then((salt) => bcrybt.hash(password, salt))
            .then((hashed) => createUser(username, email, avatar, hashed))
            .then((data) => {
                const { id, username, email } = data.rows[0]
                return { id, username, email }
            })
            //create token & set it in website cookies
            .then((payload) => {
                return jwt.sign(payload, process.env.SECERT_KEY, {
                    algorithm: 'HS256',
                })
            })
            .then((token) => {
                res.cookie('token', token, { httpOnly: true })
                    .status(302)
                    .json({
                        sucess: true,
                        username: username,
                        operation: 'create user',
                    })
            })
            .catch((err) => next(err))
    }
}
