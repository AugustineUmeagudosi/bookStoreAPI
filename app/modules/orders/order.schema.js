/* eslint-disable import/prefer-default-export */
import Joi from 'joi';

export const createOrder = Joi.object({
  books: Joi.object().pattern(Joi.string(), Joi.number())
    .required()
    .min(1)
    .messages({
      'object.base': 'The books field must be an object.',
      'object.min': 'The books field must contain at least one book entry.',
      'any.required': 'The books field is required.'
    })
});
