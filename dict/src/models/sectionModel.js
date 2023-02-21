"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Section = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("../config");
const sectionModel = new mongoose_1.default.Schema({
    board: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Board',
        require: true,
    },
    title: {
        type: String,
        default: '',
    },
}, config_1.schemaOptions);
exports.Section = mongoose_1.default.model('Section', sectionModel);
