import express from 'express';
import { authController } from '../controllers';

const router = express.Router()

router.post('/login', authController.login)
router.post('/signup', authController.signup)

export default router
