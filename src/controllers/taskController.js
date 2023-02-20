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
    var sectionId, section, tasksCount, newTask, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                sectionId = req.body.sectionId;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 6, , 7]);
                return [4 /*yield*/, models_1.Section.findById(sectionId)];
            case 2:
                section = _a.sent();
                if (!section) return [3 /*break*/, 5];
                return [4 /*yield*/, models_1.Task.find({ section: section.id }).count()];
            case 3:
                tasksCount = _a.sent();
                return [4 /*yield*/, models_1.Task.create({
                        section: section.id,
                        position: tasksCount > 0 ? tasksCount : 0
                    })];
            case 4:
                newTask = _a.sent();
                res.status(201).json({
                    status: 'success',
                    task: newTask
                });
                _a.label = 5;
            case 5: return [3 /*break*/, 7];
            case 6:
                error_1 = _a.sent();
                res.status(500).json({
                    status: 'failed',
                    message: error_1.message
                });
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.create = create;
var update = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var taskId, task, newTask, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                taskId = req.params.taskId;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, models_1.Task.findById(taskId)];
            case 2:
                task = _a.sent();
                if (!task)
                    return [2 /*return*/, res.status(404).json({
                            status: 'error',
                            message: 'Not found this task.'
                        })];
                return [4 /*yield*/, models_1.Task.findByIdAndUpdate(taskId, {
                        $set: req.body
                    }, {
                        "new": true,
                        runValidators: true
                    })];
            case 3:
                newTask = _a.sent();
                res.status(200).json({
                    status: 'success',
                    data: {
                        task: newTask
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
    var taskId, sectionId, task, tasks, taskUpdateKeyAsync, key, ele, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                taskId = req.params.taskId;
                sectionId = req.body.sectionId;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 6, , 7]);
                return [4 /*yield*/, models_1.Task.findById(taskId)];
            case 2:
                task = _a.sent();
                if (!task)
                    return [2 /*return*/, res.status(404).json({
                            status: 'error',
                            message: 'Not found this task.'
                        })];
                return [4 /*yield*/, models_1.Task.deleteOne({ _id: taskId })];
            case 3:
                _a.sent();
                return [4 /*yield*/, models_1.Task.find({ section: sectionId })];
            case 4:
                tasks = _a.sent();
                taskUpdateKeyAsync = [];
                for (key in tasks) {
                    ele = tasks[key];
                    taskUpdateKeyAsync.push(models_1.Task.findByIdAndUpdate(ele.id, {
                        $set: {
                            position: key
                        }
                    }));
                }
                return [4 /*yield*/, Promise.all([taskUpdateKeyAsync])];
            case 5:
                _a.sent();
                res.status(204).json({
                    status: 'success',
                    data: null
                });
                return [3 /*break*/, 7];
            case 6:
                error_3 = _a.sent();
                res.status(500).json({
                    status: 'failed',
                    message: error_3.message
                });
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.remove = remove;
