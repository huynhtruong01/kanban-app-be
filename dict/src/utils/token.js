"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.signToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const signToken = (id) => {
    return jsonwebtoken_1.default.sign({ id }, process.env.TOKEN_SECRET_KEY, {
        expiresIn: process.env.EXPIRE_IN,
    });
};
exports.signToken = signToken;
const verifyToken = (token) => {
    return jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET_KEY);
};
exports.verifyToken = verifyToken;
