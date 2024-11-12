const Joi = require('joi')

const loginSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
})

const registerSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
  username: Joi.string().required(),
})

module.exports = { loginSchema, registerSchema }
