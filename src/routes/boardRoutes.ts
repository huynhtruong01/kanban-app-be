import express from 'express'
import { boardController } from '../controllers'
import { verifyTokenUser } from '../middlewares'

const router = express.Router()

router.use(verifyTokenUser)

router
    .route('/')
    .get(boardController.getAll)
    .get(boardController.getFavorite)
    .post(boardController.create)
    .put(boardController.updatePosition)
    .post(boardController.updateFavoritePosition)

router.route('/:boardId').get(boardController.getOne).put(boardController.update)

export default router
