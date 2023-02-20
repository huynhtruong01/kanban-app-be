"use strict";
exports.__esModule = true;
exports.Board = void 0;
var mongoose_1 = require("mongoose");
var config_1 = require("../config");
var boardSchema = new mongoose_1["default"].Schema({
    user: {
        type: mongoose_1["default"].Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    icon: {
        type: String,
        "default": '📜'
    },
    title: {
        type: String,
        "default": 'Untitled'
    },
    description: {
        type: String,
        "default": "Add description here \n      \uD83D\uDFE2 You can add multiline description\n      \uD83D\uDFE2 Let't start...\n      "
    },
    position: {
        type: Number
    },
    favorite: {
        type: Boolean,
        "default": false
    },
    favoritePosition: {
        type: Number,
        "default": 0
    }
}, config_1.schemaOptions);
exports.Board = mongoose_1["default"].model('Board', boardSchema);
