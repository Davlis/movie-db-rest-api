import { Router } from 'express';

import movieRoutes from './movie';
import commentRoutes from './comment';

const router = Router();

router.use('/movies', movieRoutes);
router.use('/home', commentRoutes);

export default router;
