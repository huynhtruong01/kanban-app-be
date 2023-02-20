"use strict";
exports.__esModule = true;
exports.Task = void 0;
var mongoose_1 = require("mongoose");
var config_1 = require("../config");
var taskSchema = new mongoose_1["default"].Schema({
    section: {
        type: mongoose_1["default"].Schema.Types.ObjectId,
        ref: 'Section',
        required: true
    },
    title: {
        type: String,
        "default": ''
    },
    content: {
        type: String,
        "default": ''
    },
    position: {
        type: Number
    }
}, config_1.schemaOptions);
taskSchema.pre('save', function (next) {
    this.populate('Section');
    next();
});
exports.Task = mongoose_1["default"].model('Task', taskSchema);
