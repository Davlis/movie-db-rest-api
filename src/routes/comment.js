import { Router } from 'express';
import { errorWrap } from '../utils';
import * as commentController from '../controllers/comment';
import validate from '../middlewares/validate';
import validationSchema from '../validators/comment';

const router = Router();

router.post('/', validate(validationSchema.create), errorWrap(commentController.create));
router.get('/', validate(validationSchema.list), errorWrap(commentController.list));
router.get('/:id', validate(validationSchema.one), errorWrap(commentController.one));

export default router;
