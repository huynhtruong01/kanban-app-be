"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../controllers");
const middlewares_1 = require("../middlewares");
const router = express_1.default.Router();
router.use(middlewares_1.verifyTokenUser);
router
    .route('/favorites')
    .get(controllers_1.boardController.getFavorite)
    .post(controllers_1.boardController.updateFavoritePosition);
router
    .route('/')
    .get(controllers_1.boardController.getAll)
    .post(controllers_1.boardController.create)
    .put(controllers_1.boardController.updatePosition);
router
    .route('/:boardId')
    .get(controllers_1.boardController.getOne)
    .put(controllers_1.boardController.update)
    .delete(controllers_1.boardController.remove);
exports.default = router;
