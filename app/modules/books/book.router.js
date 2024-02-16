import { Router } from 'express';
import BookController from './book.controller';
import { ValidationMiddleware, Auth } from '../../middlewares';
import * as Schema from './book.schema';

const { isAuthenticated } = Auth;

const router = Router();
const { validate } = ValidationMiddleware;

router.get('/', BookController.getPlans);
router.post('/rent', [isAuthenticated], validate(Schema.createPlan), BookController.createPlan);
router.get('/rent', [isAuthenticated], validate(Schema.createPlan), BookController.createPlan);

export default router;
