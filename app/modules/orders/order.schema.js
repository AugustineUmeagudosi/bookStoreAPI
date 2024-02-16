/* eslint-disable import/prefer-default-export */
import Joi from 'joi';
import { ValidationHelper } from '../../utils';

export const createOrder = Joi.object({
  books: Joi.object().pattern(Joi.string(), Joi.number()).required(),
  paymentMethod: ValidationHelper.stringCheck('payment method')
});
