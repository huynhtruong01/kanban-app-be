"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Task = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("../config");
const taskSchema = new mongoose_1.default.Schema({
    section: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Section',
        required: true,
    },
    title: {
        type: String,
        default: 'Untitled',
    },
    content: {
        type: String,
        default: '',
    },
    position: {
        type: Number,
    },
}, config_1.schemaOptions);
taskSchema.pre('save', function (next) {
    this.populate('Section');
    next();
});
exports.Task = mongoose_1.default.model('Task', taskSchema);
