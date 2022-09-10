const joi = require('joi')

module.exports = joi.object({
    title: joi.string().alphanum().min(7).max(100).required(),
    content: joi.string().alphanum().min(7).max(100).required(),
})
