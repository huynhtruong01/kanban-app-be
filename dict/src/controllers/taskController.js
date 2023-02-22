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
exports.updatePosition = exports.remove = exports.update = exports.create = void 0;
const models_1 = require("../models");
const create = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { sectionId } = req.body;
    try {
        const section = yield models_1.Section.findById(sectionId);
        if (section) {
            const tasksCount = yield models_1.Task.find({ section: section.id }).count();
            const newTask = yield models_1.Task.create({
                section: section.id,
                position: tasksCount > 0 ? tasksCount : 0,
            });
            res.status(201).json({
                status: 'success',
                task: newTask,
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
exports.create = create;
const update = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { taskId } = req.params;
    try {
        const task = yield models_1.Task.findById(taskId);
        if (!task)
            return res.status(404).json({
                status: 'error',
                message: 'Not found this task.',
            });
        const newTask = yield models_1.Task.findByIdAndUpdate(taskId, {
            $set: req.body,
        }, {
            new: true,
            runValidators: true,
        });
        res.status(200).json({
            status: 'success',
            data: {
                task: newTask,
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
exports.update = update;
const remove = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { taskId } = req.params;
    try {
        const task = yield models_1.Task.findById(taskId);
        if (!task)
            return res.status(404).json({
                status: 'error',
                message: 'Not found this task.',
            });
        yield models_1.Task.deleteOne({ _id: taskId });
        const tasks = yield models_1.Task.find({ section: task.section }).sort('position');
        const taskUpdateKeyAsync = [];
        for (const key in tasks) {
            const ele = tasks[key];
            taskUpdateKeyAsync.push(models_1.Task.findByIdAndUpdate(ele.id, {
                $set: {
                    position: key,
                },
            }));
        }
        yield Promise.all([taskUpdateKeyAsync]);
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
const updatePosition = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { tasks } = req.body;
    try {
        const updatePositionTasks = [];
        for (const key in tasks) {
            const task = tasks[key];
            updatePositionTasks.push(models_1.Task.findByIdAndUpdate(task._id, {
                $set: {
                    position: key,
                },
            }));
        }
        yield Promise.all([updatePositionTasks]);
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
exports.updatePosition = updatePosition;
