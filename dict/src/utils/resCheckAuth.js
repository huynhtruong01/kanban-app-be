"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resCheckAuth = void 0;
const resCheckAuth = (res) => {
    return res.status(401).json({
        status: 'error',
        message: 'Invalid Authenticated.',
    });
};
exports.resCheckAuth = resCheckAuth;
