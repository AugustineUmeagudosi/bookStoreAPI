import Joi from 'joi';
import { ValidationHelper } from '../../utils';

export const signUp = Joi.object({
  name: ValidationHelper.stringCheck('name', 2),
  email: ValidationHelper.emailCheck(),
  password: ValidationHelper.passwordCheck(),
});

export const login = Joi.object({
  email: ValidationHelper.emailCheck(),
  password: ValidationHelper.passwordCheck(),
});
