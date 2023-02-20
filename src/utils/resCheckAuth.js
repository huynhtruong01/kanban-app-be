"use strict";
exports.__esModule = true;
exports.resCheckAuth = void 0;
var resCheckAuth = function (res) {
    return res.status(401).json({
        status: 'error',
        message: 'Invalid Authenticated.'
    });
};
exports.resCheckAuth = resCheckAuth;
