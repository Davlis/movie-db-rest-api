import { Router } from 'express';
import * as movieController from '../controllers/movie';

const router = Router();

router.post('/', movieController.create);
router.get('/', movieController.all);
router.get('/:id', movieController.one);


export default router;
