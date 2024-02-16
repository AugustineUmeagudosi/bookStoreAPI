import { Router } from 'express';
import UserController from './user.controller';
import { ValidationMiddleware } from '../../middlewares';
import * as Schema from './user.schema';

const router = Router();
const { validate } = ValidationMiddleware;

router.post('/signup', validate(Schema.signUp), UserController.signUp);
router.post('/login', validate(Schema.login), UserController.login);

export default router;
