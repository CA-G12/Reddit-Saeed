const { searchUser } = require('../../database/queries/users')
const { signInSchema } = require('../../validation')
const custumError = require('../../custumError')
const bcrybt = require('bcryptjs')
const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    const { email, password } = req.body
    let userEmail = ''
    let userId = ''
    let userName = ''
    //validate user info input
    const { error } = signInSchema.validate({
        email,
        password,
    })
    if (error) {
        //send errors as json to handle it AS server side validation
        //status 422 Unprocessable Entity
        throw custumError(error, 422)
    } else {
        //contenue sign in operation
        /*
            sure email is included in the users database
        */
        searchUser(email)
            .then((data) => {
                if (data.rows.length === 0) {
                    //handle envalid email proplem !!!!! status 400
                    throw custumError('Invalid Email or Password', 400)
                } else {
                    return data.rows[0]
                }
            })
            //check password
            .then((user) => {
                userEmail = user.email
                userId = user.id
                userName = user.username
                return bcrybt.compare(password, user.password)
            })
            //set user cookie
            .then((result) => {
                if (result) {
                    const payload = {
                        id: userId,
                        username: userName,
                        email: userEmail,
                    }
                    return jwt.sign(payload, process.env.SECERT_KEY, {
                        algorithm: 'HS256',
                    })
                } else {
                    //status code wrong password
                    throw custumError('Invalid Email or Password', 400)
                }
            })
            .then((token) => {
                res.cookie('token', token, { httpOnly: true })
                    .status(302)
                    .json({
                        sucess: true,
                        operation: 'login user',
                        username: userName,
                    })
            })
            .catch((err) => next(err))
    }
}
