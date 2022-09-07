const joi = require('joi')

module.exports = joi.object({
    username: joi.string().alphanum().min(7).max(100).required(),
    email: joi.string().email().required(),
    password: joi.string().min(8).max(50).required(),
    confirmPassword: joi.ref('password'),
    avatar: joi.required(),
})
