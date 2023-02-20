'use strict'
exports.__esModule = true
var express_1 = require('express')
var controllers_1 = require('../controllers')
var router = express_1.Router()
router.post('/login', controllers_1.authController.login)
router.post('/signup', controllers_1.authController.login)
exports.default = router
