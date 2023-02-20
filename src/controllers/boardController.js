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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.remove = exports.updateFavoritePosition = exports.getFavorite = exports.update = exports.getOne = exports.updatePosition = exports.getAll = exports.create = void 0;
var models_1 = require("../models");
var utils_1 = require("../utils");
var create = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var boardsCount, newBoard, error_1;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                return [4 /*yield*/, models_1.Board.find().count()];
            case 1:
                boardsCount = _b.sent();
                return [4 /*yield*/, models_1.Board.create({
                        user: (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.id,
                        position: boardsCount > 0 ? boardsCount : 0
                    })];
            case 2:
                newBoard = _b.sent();
                res.status(201).json({
                    status: 'success',
                    data: {
                        board: newBoard
                    }
                });
                return [3 /*break*/, 4];
            case 3:
                error_1 = _b.sent();
                res.status(500).json({
                    status: 'failed',
                    message: error_1.message
                });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.create = create;
var getAll = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var boards, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                if (!req.user) return [3 /*break*/, 2];
                return [4 /*yield*/, models_1.Board.find({ user: req.user.id }).sort('-position')];
            case 1:
                boards = _a.sent();
                res.status(200).json({
                    status: 'success',
                    data: {
                        boards: boards
                    }
                });
                _a.label = 2;
            case 2: return [3 /*break*/, 4];
            case 3:
                error_2 = _a.sent();
                res.status(500).json({
                    status: 'failed',
                    message: error_2.message
                });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getAll = getAll;
var updatePosition = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var boards, _a, _b, _i, key, board, error_3;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 5, , 6]);
                boards = req.body.boards;
                _a = [];
                for (_b in boards.reverse())
                    _a.push(_b);
                _i = 0;
                _c.label = 1;
            case 1:
                if (!(_i < _a.length)) return [3 /*break*/, 4];
                key = _a[_i];
                board = boards[key];
                return [4 /*yield*/, models_1.Board.findByIdAndUpdate(board.id, {
                        $set: {
                            position: key
                        }
                    })];
            case 2:
                _c.sent();
                _c.label = 3;
            case 3:
                _i++;
                return [3 /*break*/, 1];
            case 4:
                res.status(200).json({
                    status: 'success'
                });
                return [3 /*break*/, 6];
            case 5:
                error_3 = _c.sent();
                res.status(500).json({
                    status: 'failed',
                    message: error_3.message
                });
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.updatePosition = updatePosition;
var getOne = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var boardId, board, sections, _i, sections_1, section, tasks, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                boardId = req.params.boardId;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 8, , 9]);
                if (!req.user)
                    return [2 /*return*/, (0, utils_1.resCheckAuth)(res)];
                return [4 /*yield*/, models_1.Board.findOne({ user: req.user.id, id: boardId })];
            case 2:
                board = _a.sent();
                if (!board)
                    return [2 /*return*/, res.status(404).json({
                            status: 'failed',
                            message: 'Board is not founded.'
                        })];
                return [4 /*yield*/, models_1.Section.find({ board: boardId })];
            case 3:
                sections = _a.sent();
                _i = 0, sections_1 = sections;
                _a.label = 4;
            case 4:
                if (!(_i < sections_1.length)) return [3 /*break*/, 7];
                section = sections_1[_i];
                return [4 /*yield*/, models_1.Task.find({ section: section.id })
                        .populate('section')
                        .sort('-position')];
            case 5:
                tasks = _a.sent();
                section._doc.tasks = tasks;
                _a.label = 6;
            case 6:
                _i++;
                return [3 /*break*/, 4];
            case 7:
                board._doc.sections = sections;
                res.status(200).json({
                    status: 'success',
                    data: {
                        board: board
                    }
                });
                return [3 /*break*/, 9];
            case 8:
                error_4 = _a.sent();
                res.status(500).json({
                    status: 'failed',
                    message: error_4.message
                });
                return [3 /*break*/, 9];
            case 9: return [2 /*return*/];
        }
    });
}); };
exports.getOne = getOne;
var update = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var boardId, _a, title, description, favorite, currentBoard, favorites, _b, _c, _i, key, ele, error_5;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                boardId = req.params.boardId;
                _a = req.body, title = _a.title, description = _a.description, favorite = _a.favorite;
                _d.label = 1;
            case 1:
                _d.trys.push([1, 10, , 11]);
                if (!req.user)
                    return [2 /*return*/, (0, utils_1.resCheckAuth)(res)];
                if (title === '')
                    req.body.title = 'Untitled';
                if (description === '')
                    req.body.description = 'Add description here';
                return [4 /*yield*/, models_1.Board.findById(boardId)];
            case 2:
                currentBoard = _d.sent();
                if (!currentBoard)
                    return [2 /*return*/, res.status(404).json({
                            status: 'error',
                            message: 'Not found this board.'
                        })];
                if (!(favorite !== undefined && currentBoard.favorite !== favorite)) return [3 /*break*/, 8];
                return [4 /*yield*/, models_1.Board.find({
                        user: req.user.id,
                        favorite: true
                    })];
            case 3:
                favorites = _d.sent();
                if (!favorite) return [3 /*break*/, 4];
                req.body.favoritePosition = favorites.length > 0 ? favorites.length : 0;
                return [3 /*break*/, 8];
            case 4:
                _b = [];
                for (_c in favorites)
                    _b.push(_c);
                _i = 0;
                _d.label = 5;
            case 5:
                if (!(_i < _b.length)) return [3 /*break*/, 8];
                key = _b[_i];
                ele = favorites[key];
                return [4 /*yield*/, models_1.Board.findByIdAndUpdate(ele.id, {
                        $set: {
                            favoritePosition: key
                        }
                    })];
            case 6:
                _d.sent();
                _d.label = 7;
            case 7:
                _i++;
                return [3 /*break*/, 5];
            case 8: return [4 /*yield*/, models_1.Board.findByIdAndUpdate(boardId, {
                    $set: req.body
                })];
            case 9:
                _d.sent();
                return [3 /*break*/, 11];
            case 10:
                error_5 = _d.sent();
                res.status(500).json({
                    status: 'failed',
                    message: error_5.message
                });
                return [3 /*break*/, 11];
            case 11: return [2 /*return*/];
        }
    });
}); };
exports.update = update;
var getFavorite = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var favorites, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                if (!req.user)
                    return [2 /*return*/, (0, utils_1.resCheckAuth)(res)];
                return [4 /*yield*/, models_1.Board.find({
                        user: req.user.id,
                        favorite: true
                    }).sort('-favoritePosition')];
            case 1:
                favorites = _a.sent();
                res.status(200).json({
                    status: 'success',
                    data: {
                        favorites: favorites
                    }
                });
                return [3 /*break*/, 3];
            case 2:
                error_6 = _a.sent();
                res.status(500).json({
                    status: 'failed',
                    message: error_6.message
                });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getFavorite = getFavorite;
var updateFavoritePosition = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var favorites, _a, _b, _i, key, favorite, error_7;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                favorites = req.body.favorites;
                _c.label = 1;
            case 1:
                _c.trys.push([1, 6, , 7]);
                _a = [];
                for (_b in favorites.reverse())
                    _a.push(_b);
                _i = 0;
                _c.label = 2;
            case 2:
                if (!(_i < _a.length)) return [3 /*break*/, 5];
                key = _a[_i];
                favorite = favorites[key];
                return [4 /*yield*/, models_1.Board.findByIdAndUpdate(favorite.id, {
                        $set: {
                            favoritePosition: key
                        }
                    })];
            case 3:
                _c.sent();
                _c.label = 4;
            case 4:
                _i++;
                return [3 /*break*/, 2];
            case 5:
                res.status(200).json({
                    status: 'success'
                });
                return [3 /*break*/, 7];
            case 6:
                error_7 = _c.sent();
                res.status(500).json({
                    status: 'failed',
                    message: error_7.message
                });
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.updateFavoritePosition = updateFavoritePosition;
var remove = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    return [2 /*return*/];
}); }); };
exports.remove = remove;
