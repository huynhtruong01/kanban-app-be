"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const config_1 = require("./src/config");
const routes_1 = require("./src/routes");
const app = (0, express_1.default)();
dotenv_1.default.config({
    path: './.env',
});
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, morgan_1.default)('dev'));
app.use((0, cors_1.default)());
app.use('/api/v1', (req, res) => {
    res.json({
        title: 'Welcome to Kanban App.',
    });
}, routes_1.routes);
(0, config_1.connectDB)();
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running, port: ${port}`));
