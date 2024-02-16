import express from 'express';
import { Response } from '../utils';
import UserRoutes from '../modules/users/user.router';
import BookRoutes from '../modules/books/book.router';
import OrderRoutes from '../modules/orders/order.router';

const router = express.Router();

router.get('/', (req, res) => Response.info(res, 'Hello World', 200));
router.get('/health-check/ping', (req, res) => Response.info(res, 'PONG', 200));
router.use('/users', UserRoutes);
router.use('/books', BookRoutes);
router.use('/orders', OrderRoutes);
router.use('*', (req, res) => Response.error(res, 'The resource you are looking for was not found', 404));

export default router;
