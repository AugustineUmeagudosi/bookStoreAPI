import { Router } from 'express';
import BookController from './order.controller';
import { Auth, ValidationMiddleware } from '../../middlewares';
import * as Schema from './order.schema';

const { validate } = ValidationMiddleware;
const { isAuthenticated } = Auth;
const router = Router();

router.post('/', [isAuthenticated], validate(Schema.createOrder), BookController.createOrder);
router.get('/', [isAuthenticated], BookController.getOrders);

export default router;
