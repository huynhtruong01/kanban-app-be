'use strict'
exports.__esModule = true
exports.routes = void 0
var express_1 = require('express')
var authRoutes_1 = require('./authRoutes')
var boardRoutes_1 = require('./boardRoutes')
var sectionRoutes_1 = require('./sectionRoutes')
var taskRoutes_1 = require('./taskRoutes')
var router = express_1.Router()
exports.routes = [
    router.use('/boards', boardRoutes_1['default']),
    router.use('/sections', sectionRoutes_1['default']),
    router.use('/tasks', taskRoutes_1['default']),
    router.use('/auth', authRoutes_1['default']),
]
