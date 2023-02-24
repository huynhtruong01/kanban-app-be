import express, { Response } from 'express'
import { authController } from '../controllers'
import { verifyTokenUser } from '../middlewares'
import { IRequestUser } from '../types'

const router = express.Router()

router.post('/login', authController.login)
router.post('/signup', authController.signup)
router.post('/verify-token', verifyTokenUser, (req: IRequestUser, res: Response) => {
    res.status(200).json({ status: 'success', data: { user: req.user } })
})

export default router
