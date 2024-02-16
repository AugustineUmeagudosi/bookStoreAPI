import { Router } from 'express';
import BookController from './book.controller';
import { Auth } from '../../middlewares';

const { isAuthenticated } = Auth;
const router = Router();

router.get('/', [isAuthenticated], BookController.getBooks);

export default router;
