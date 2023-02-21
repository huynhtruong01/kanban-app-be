"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.signup = void 0;
const models_1 = require("../models");
const utils_1 = require("../utils");
const signup = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield models_1.User.create(req.body);
        const token = (0, utils_1.signToken)(user.id);
        res.status(201).json({
            status: 'success',
            data: {
                user,
                token,
            },
        });
    }
    catch (error) {
        res.status(500).json({
            status: 'failed',
            message: error.message,
        });
    }
});
exports.signup = signup;
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    try {
        const user = yield models_1.User.findOne({ username });
        if (!user) {
            return res.status(404).json({
                status: 'error',
                message: 'Invalid username or not found this user.',
            });
        }
        let isCorrectPassword = false;
        if (user.password) {
            isCorrectPassword = yield (0, utils_1.checkPassword)(password, user.password);
        }
        if (!isCorrectPassword) {
            return res.status(404).json({
                status: 'failed',
                message: 'Incorrect password.',
            });
        }
        user.password = undefined;
        user.confirmPassword = undefined;
        const token = (0, utils_1.signToken)(user.id);
        res.status(200).json({
            status: 'success',
            data: {
                user,
                token,
            },
        });
    }
    catch (error) {
        res.status(500).json({
            status: 'failed',
            message: error.message,
        });
    }
});
exports.login = login;
