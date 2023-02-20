'use strict'
exports.__esModule = true
var express_1 = require('express')
var controllers_1 = require('../controllers')
var middlewares_1 = require('../middlewares')
var router = express_1.Router()
router.use(middlewares_1.verifyTokenUser)
router
    .route('/')
    .get(controllers_1.boardController.getAll)
    .get(controllers_1.boardController.getFavorite)
    .post(controllers_1.boardController.create)
    .put(controllers_1.boardController.updatePosition)
    .post(controllers_1.boardController.updateFavoritePosition)
router
    .route('/:boardId')
    .get(controllers_1.boardController.getOne)
    .put(controllers_1.boardController.update)
exports.default = router
