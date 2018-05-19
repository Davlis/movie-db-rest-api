import { Router } from 'express';
import { errorWrap } from '../utils';
import * as movieController from '../controllers/movie';
import validate from '../middlewares/validate';
import validationSchema from '../validators/movie';

const router = Router();

router.post('/', validate(validationSchema.create), errorWrap(movieController.create));
router.get('/', validate(validationSchema.list), errorWrap(movieController.list));
router.get('/:id', validate(validationSchema.one), errorWrap(movieController.one));

export default router;
