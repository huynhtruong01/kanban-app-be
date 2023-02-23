import express from 'express'
import { boardController } from '../controllers'
import { verifyTokenUser } from '../middlewares'

const router = express.Router()

router.use(verifyTokenUser)

router
    .route('/favorites')
    .get(boardController.getFavorite)
    .post(boardController.updateFavoritePosition)

router
    .route('/')
    .get(boardController.getAll)
    .post(boardController.create)
    .put(boardController.updatePosition)

router
    .route('/:boardId')
    .get(boardController.getOne)
    .put(boardController.update)
    .delete(boardController.remove)

export default router
