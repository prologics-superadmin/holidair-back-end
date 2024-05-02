// middlewares/userValidation.js
const Joi = require('joi');

const userSchema = Joi.object({
  email: Joi.string().email().required(),
  user_name: Joi.string().required(),
  password: Joi.string().required(),
  EMP_number: Joi.number(),
  address: Joi.string().required(),
  user_role_id: Joi.string().required(),
//  status: Joi.boolean(),
 // created_at: Joi.date(),
 // updated_at: Joi.date(),
});

module.exports = { userSchema };