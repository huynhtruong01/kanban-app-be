import express from 'express'
import { taskController } from '../controllers'
import { verifyTokenUser } from '../middlewares'

const router = express.Router()

router.use(verifyTokenUser)

router.route('/').post(taskController.create)
router.route('/:taskId').put(taskController.update).delete(taskController.remove)

export default router
