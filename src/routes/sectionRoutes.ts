import express from 'express'
import { sectionController } from '../controllers'
import { verifyTokenUser } from '../middlewares'

const router = express.Router()

router.use(verifyTokenUser)

router.route('/').post(sectionController.create)
router.route('/:sectionId').put(sectionController.update).delete(sectionController.remove)

export default router
