"use strict";
exports.__esModule = true;
exports.verifyToken = exports.signToken = void 0;
var jsonwebtoken_1 = require("jsonwebtoken");
var signToken = function (id) {
    jsonwebtoken_1["default"].sign({ id: id }, process.env.TOKEN_SECRET_KEY, {
        expiresIn: process.env.EXPIRE_IN
    });
};
exports.signToken = signToken;
var verifyToken = function (token) {
    return jsonwebtoken_1["default"].verify(token, process.env.TOKEN_SECRET_KEY);
};
exports.verifyToken = verifyToken;
