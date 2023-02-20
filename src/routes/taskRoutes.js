'use strict'
exports.__esModule = true
var express_1 = require('express')
var controllers_1 = require('../controllers')
var middlewares_1 = require('../middlewares')
var router = express_1.Router()
router.use(middlewares_1.verifyTokenUser)
router.route('/').post(controllers_1.taskController.create)
router
    .route('/:taskId')
    .put(controllers_1.taskController.update)
    ['delete'](controllers_1.taskController.remove)
exports.default = router
