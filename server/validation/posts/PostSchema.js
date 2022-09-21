const joi = require('joi');

module.exports = joi.object({
  title: joi.string().min(7).max(100).required(),
  content: joi.string().min(7).max(100).required(),
});
