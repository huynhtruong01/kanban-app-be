'use strict'
exports.__esModule = true
var cors_1 = require('cors')
var dotenv_1 = require('dotenv')
var express_1 = require('express')
var morgan_1 = require('morgan')
var config_1 = require('./src/config')
var routes_1 = require('./src/routes')
var app = express_1()
dotenv_1.config({
    path: './.env',
})
app.use(express_1.json())
app.use(express_1.urlencoded({ extended: true }))
app.use((0, morgan_1)('dev'))
app.use((0, cors_1)())
app.use(
    '/api/v1',
    function (req, res) {
        res.json({
            title: 'Welcome to Kanban App.',
        })
    },
    routes_1.routes
)
;(0, config_1.connectDB)()
var port = process.env.PORT || 5000
app.listen(port, function () {
    return console.log('Server is running, port: '.concat(port))
})
