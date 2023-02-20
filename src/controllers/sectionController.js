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
exports.remove = exports.update = exports.create = void 0;
var models_1 = require("../models");
var create = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var boardId, newSection, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                boardId = req.params.boardId;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, models_1.Section.create({ board: boardId })];
            case 2:
                newSection = _a.sent();
                newSection._doc.tasks = [];
                res.status(201).json({
                    status: 'success',
                    data: {
                        section: newSection
                    }
                });
                return [3 /*break*/, 4];
            case 3:
                error_1 = _a.sent();
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
var update = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var sectionId, section, newSection, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                sectionId = req.params.sectionId;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, models_1.Section.findById(sectionId)];
            case 2:
                section = _a.sent();
                if (!section)
                    return [2 /*return*/, res.status(404).json({
                            status: 'error',
                            message: 'Not found this section.'
                        })];
                return [4 /*yield*/, models_1.Section.findByIdAndUpdate(sectionId, {
                        $set: req.body
                    }, {
                        "new": true,
                        runValidators: true
                    })];
            case 3:
                newSection = _a.sent();
                res.status(200).json({
                    status: 'success',
                    data: {
                        section: newSection
                    }
                });
                return [3 /*break*/, 5];
            case 4:
                error_2 = _a.sent();
                res.status(500).json({
                    status: 'failed',
                    message: error_2.message
                });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.update = update;
var remove = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var sectionId, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                sectionId = req.params.sectionId;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, models_1.Task.deleteMany({ section: sectionId })];
            case 2:
                _a.sent();
                return [4 /*yield*/, models_1.Section.findByIdAndDelete(sectionId)];
            case 3:
                _a.sent();
                res.status(204).json({
                    status: 'success'
                });
                return [3 /*break*/, 5];
            case 4:
                error_3 = _a.sent();
                res.status(500).json({
                    status: 'failed',
                    message: error_3.message
                });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.remove = remove;
