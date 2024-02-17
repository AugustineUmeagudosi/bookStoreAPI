/* eslint-disable import/prefer-default-export */
import Joi from 'joi';

export const createOrder = Joi.object({
  books: Joi.object().pattern(Joi.string(), Joi.number()).required()
});
