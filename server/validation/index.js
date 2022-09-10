const signInSchema = require('./users/createSigninSchema')
const signUpSchema = require('./users/createSignupSchema')
const postSchema = require('./posts/PostSchema')

module.exports = { signInSchema, signUpSchema, postSchema }
