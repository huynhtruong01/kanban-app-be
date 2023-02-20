"use strict";
exports.__esModule = true;
exports.Section = void 0;
var mongoose_1 = require("mongoose");
var config_1 = require("../config");
var sectionModel = new mongoose_1["default"].Schema({
    board: {
        type: mongoose_1["default"].Schema.Types.ObjectId,
        ref: 'Board',
        require: true
    },
    title: {
        type: String,
        "default": ''
    }
}, config_1.schemaOptions);
exports.Section = mongoose_1["default"].model('Section', sectionModel);
