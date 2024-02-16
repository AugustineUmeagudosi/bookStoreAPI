import Joi from 'joi';
import { ValidationHelper } from '../../utils';

export const createPlan = Joi.object({
  name: ValidationHelper.stringCheck('plan name', 2),
  price: ValidationHelper.stringCheck('price'),
  duration: ValidationHelper.stringCheck('duration'),
  benefits: Joi.array().required().items(Joi.string())
});

export const updatePlan = Joi.object({
  name: ValidationHelper.optionalStringCheck('plan name', 2),
  price: ValidationHelper.optionalStringCheck('price'),
  duration: ValidationHelper.optionalStringCheck('duration'),
  benefits: Joi.array().optional().items(Joi.string())
});
