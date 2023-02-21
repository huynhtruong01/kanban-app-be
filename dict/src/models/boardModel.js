"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Board = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("../config");
const boardSchema = new mongoose_1.default.Schema({
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User',
        require: true,
    },
    icon: {
        type: String,
        default: '📜',
    },
    title: {
        type: String,
        default: 'Untitled',
    },
    description: {
        type: String,
        default: `Add description here 
      🟢 You can add multiline description
      🟢 Let't start...
      `,
    },
    position: {
        type: Number,
    },
    favorite: {
        type: Boolean,
        default: false,
    },
    favoritePosition: {
        type: Number,
        default: 0,
    },
}, config_1.schemaOptions);
exports.Board = mongoose_1.default.model('Board', boardSchema);
