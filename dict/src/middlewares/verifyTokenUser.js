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
exports.verifyTokenUser = exports.decodeToken = void 0;
const models_1 = require("../models");
const utils_1 = require("../utils");
const decodeToken = (req) => {
    const bearerHeader = req.headers['authorization'];
    console.log(bearerHeader);
    if (bearerHeader) {
        const token = bearerHeader.split(' ')[1];
        const user = (0, utils_1.verifyToken)(token);
        if (user)
            return user;
    }
    return;
};
exports.decodeToken = decodeToken;
const verifyTokenUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const decodedToken = (0, exports.decodeToken)(req);
        console.log(decodedToken);
        if (!decodedToken)
            return res.status(401).json({
                status: 'error',
                message: 'Unauthorized.',
            });
        const user = yield models_1.User.findById(decodedToken.id);
        if (!user)
            return res.status(404).json({
                status: 'error',
                message: 'Not found this user.',
            });
        req.user = user;
        next();
    }
    catch (error) {
        res.status(500).json({
            status: 'failed',
            message: error.message,
        });
    }
});
exports.verifyTokenUser = verifyTokenUser;
