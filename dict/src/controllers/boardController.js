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
exports.remove = exports.updateFavoritePosition = exports.getFavorite = exports.update = exports.getOne = exports.updatePosition = exports.getAll = exports.create = void 0;
const models_1 = require("../models");
const utils_1 = require("../utils");
const create = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const boardsCount = yield models_1.Board.find().count();
        const newBoard = yield models_1.Board.create({
            user: (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.id,
            position: boardsCount > 0 ? boardsCount : 0,
        });
        res.status(201).json({
            status: 'success',
            data: {
                board: newBoard,
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
exports.create = create;
const getAll = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.user) {
            const boards = yield models_1.Board.find({ user: req.user.id }).sort('-position');
            res.status(200).json({
                status: 'success',
                data: {
                    boards,
                },
            });
        }
    }
    catch (error) {
        res.status(500).json({
            status: 'failed',
            message: error.message,
        });
    }
});
exports.getAll = getAll;
const updatePosition = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { boards } = req.body;
        for (const key in boards.reverse()) {
            const board = boards[key];
            yield models_1.Board.findByIdAndUpdate(board.id, {
                $set: {
                    position: key,
                },
            });
        }
        res.status(200).json({
            status: 'success',
        });
    }
    catch (error) {
        res.status(500).json({
            status: 'failed',
            message: error.message,
        });
    }
});
exports.updatePosition = updatePosition;
const getOne = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { boardId } = req.params;
    try {
        if (!req.user)
            return (0, utils_1.resCheckAuth)(res);
        const board = yield models_1.Board.findOne({ user: req.user.id, _id: boardId });
        if (!board)
            return res.status(404).json({
                status: 'failed',
                message: 'Board is not founded.',
            });
        const sections = yield models_1.Section.find({ board: boardId });
        for (const section of sections) {
            const tasks = yield models_1.Task.find({ section: section.id })
                .populate('section')
                .sort('-position');
            section._doc.tasks = tasks;
        }
        board._doc.sections = sections;
        res.status(200).json({
            status: 'success',
            data: {
                board,
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
exports.getOne = getOne;
const update = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { boardId } = req.params;
    const { title, description, favorite, icon } = req.body;
    try {
        if (!req.user)
            return (0, utils_1.resCheckAuth)(res);
        if (icon === '')
            req.body.icon = '📜';
        if (title === '')
            req.body.title = 'Untitled';
        if (description === '')
            req.body.description = 'Add description here...';
        const currentBoard = yield models_1.Board.findById(boardId);
        if (!currentBoard)
            return res.status(404).json({
                status: 'error',
                message: 'Not found this board.',
            });
        if (favorite !== undefined && currentBoard.favorite !== favorite) {
            const favorites = yield models_1.Board.find({
                user: req.user.id,
                favorite: true,
            });
            if (favorite) {
                req.body.favoritePosition = favorites.length > 0 ? favorites.length : 0;
            }
            else {
                const list = [];
                for (const key in favorites) {
                    const ele = favorites[key];
                    list.push(models_1.Board.findByIdAndUpdate(ele.id, {
                        $set: {
                            favoritePosition: key,
                        },
                    }));
                    yield Promise.all([list]);
                }
            }
        }
        yield models_1.Board.findByIdAndUpdate(boardId, {
            $set: req.body,
        });
    }
    catch (error) {
        res.status(500).json({
            status: 'failed',
            message: error.message,
        });
    }
});
exports.update = update;
const getFavorite = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.user)
            return (0, utils_1.resCheckAuth)(res);
        const favorites = yield models_1.Board.find({
            user: req.user.id,
            favorite: true,
        }).sort('-favoritePosition');
        res.status(200).json({
            status: 'success',
            data: {
                favorites,
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
exports.getFavorite = getFavorite;
const updateFavoritePosition = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { favorites } = req.body;
    try {
        for (const key in favorites.reverse()) {
            const favorite = favorites[key];
            yield models_1.Board.findByIdAndUpdate(favorite.id, {
                $set: {
                    favoritePosition: key,
                },
            });
        }
        res.status(200).json({
            status: 'success',
            data: null,
        });
    }
    catch (error) {
        res.status(500).json({
            status: 'failed',
            message: error.message,
        });
    }
});
exports.updateFavoritePosition = updateFavoritePosition;
const remove = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { boardId } = req.params;
    try {
        // TODO: delete all section have boardId
        const sections = yield models_1.Section.find({ boardId });
        const deleteManySections = sections.forEach((section) => {
            models_1.Task.deleteMany({ sectionId: section._id });
        });
        yield Promise.all([deleteManySections]);
        // TODO: update all favorites position
        const board = yield models_1.Board.findById(boardId);
        if (board === null || board === void 0 ? void 0 : board.favorite) {
            const favorites = yield models_1.Board.find({
                user: board.user,
                favorite: true,
                _id: {
                    $ne: boardId,
                },
            }).sort('favoritePosition');
            for (const key in favorites) {
                const element = favorites[key];
                yield models_1.Board.findByIdAndUpdate(element.id, {
                    $set: { favoritePosition: key },
                });
            }
        }
        // TODO: delete board
        yield models_1.Board.deleteOne({ _id: boardId });
        // TODO: update all position of board
        const boards = yield models_1.Board.find().sort('position');
        for (const key in boards) {
            const board = boards[key];
            yield models_1.Board.findByIdAndUpdate(board.id, { $set: { position: key } });
        }
        res.status(204).json({
            status: 'success',
            data: null,
        });
    }
    catch (error) {
        res.status(500).json({
            status: 'failed',
            message: error.message,
        });
    }
});
exports.remove = remove;
