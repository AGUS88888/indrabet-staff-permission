import Joi from 'joi';

export const registerSchema = Joi.object({
  email: Joi.string()
    .email()
    .required()
    .messages({
      'string.email': 'Email harus valid',
      'any.required': 'Email harus diisi',
    }),
  password: Joi.string()
    .min(6)
    .required()
    .messages({
      'string.min': 'Password minimal 6 karakter',
      'any.required': 'Password harus diisi',
    }),
  name: Joi.string()
    .required()
    .messages({
      'any.required': 'Name harus diisi',
    }),
});

export const loginSchema = Joi.object({
  email: Joi.string()
    .email()
    .required()
    .messages({
      'string.email': 'Email harus valid',
      'any.required': 'Email harus diisi',
    }),
  password: Joi.string()
    .required()
    .messages({
      'any.required': 'Password harus diisi',
    }),
});
