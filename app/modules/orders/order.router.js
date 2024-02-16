import { Router } from 'express';
import BookController from './order.controller';
import { Auth } from '../../middlewares';

const { isAuthenticated } = Auth;
const router = Router();

router.post('/', [isAuthenticated], BookController.getOrders);
router.get('/', [isAuthenticated], BookController.getOrders);

export default router;
