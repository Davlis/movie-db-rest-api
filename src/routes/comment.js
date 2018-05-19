import { Router } from 'express';
import { errorWrap } from '../utils';
import * as commentController from '../controllers/comment';

const router = Router();

router.post('/', errorWrap(commentController.create));
router.get('/', errorWrap(commentController.all));
router.get('/:id', errorWrap(commentController.one));

export default router;
