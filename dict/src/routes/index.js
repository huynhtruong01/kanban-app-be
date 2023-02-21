"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = __importDefault(require("express"));
const authRoutes_1 = __importDefault(require("./authRoutes"));
const boardRoutes_1 = __importDefault(require("./boardRoutes"));
const sectionRoutes_1 = __importDefault(require("./sectionRoutes"));
const taskRoutes_1 = __importDefault(require("./taskRoutes"));
const router = express_1.default.Router();
exports.routes = [
    router.use('/boards', boardRoutes_1.default),
    router.use('/sections', sectionRoutes_1.default),
    router.use('/tasks', taskRoutes_1.default),
    router.use('/auth', authRoutes_1.default),
];
