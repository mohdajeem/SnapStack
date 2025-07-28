import express from 'express';
import { createOrUpdateSession, getAllUserSessions, getSessionById, editSessionCode } from '../controllers/sessionController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(authMiddleware);

router.route('/')
    .post(createOrUpdateSession)
    .get(getAllUserSessions);

router.route('/:id')
    .get(getSessionById)
    .put(editSessionCode);
    
export default router;