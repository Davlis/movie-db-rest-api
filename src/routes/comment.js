import { Router } from 'express';
import * as commentController from '../controllers/comment';

const router = Router();

router.post('/', commentController.create);
router.get('/', commentController.all);
router.get('/:id', commentController.one);

export default router;
