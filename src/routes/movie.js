import { Router } from 'express';
import { errorWrap } from '../utils';
import * as movieController from '../controllers/movie';

const router = Router();

router.post('/', errorWrap(movieController.create));
router.get('/', errorWrap(movieController.all));
router.get('/:id', errorWrap(movieController.one));

export default router;
