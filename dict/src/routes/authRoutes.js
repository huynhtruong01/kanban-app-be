"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../controllers");
const middlewares_1 = require("../middlewares");
const router = express_1.default.Router();
router.post('/login', controllers_1.authController.login);
router.post('/signup', controllers_1.authController.signup);
router.post('/verify-token', middlewares_1.verifyTokenUser, (req, res) => {
    console.log(req);
    res.status(200).json({ status: 'success', data: { user: req.user } });
});
exports.default = router;
