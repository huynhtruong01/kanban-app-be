'use strict'
exports.__esModule = true
var express_1 = require('express')
var controllers_1 = require('../controllers')
var middlewares_1 = require('../middlewares')
var router = express_1.Router()
router.use(middlewares_1.verifyTokenUser)
router.route('/').post(controllers_1.sectionController.create)
router
    .route('/:sectionId')
    .put(controllers_1.sectionController.update)
    ['delete'](controllers_1.sectionController.remove)
exports.default = router
