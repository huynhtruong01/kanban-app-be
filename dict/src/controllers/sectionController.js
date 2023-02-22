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
exports.remove = exports.update = exports.create = void 0;
const models_1 = require("../models");
const create = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { boardId } = req.params;
    try {
        const newSection = yield models_1.Section.create({ board: boardId });
        newSection._doc.tasks = [];
        res.status(201).json({
            status: 'success',
            data: {
                section: newSection,
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
const update = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { sectionId } = req.params;
    try {
        const section = yield models_1.Section.findById(sectionId);
        if (!section)
            return res.status(404).json({
                status: 'error',
                message: 'Not found this section.',
            });
        const newSection = yield models_1.Section.findByIdAndUpdate(sectionId, {
            $set: req.body,
        }, {
            new: true,
            runValidators: true,
        });
        res.status(200).json({
            status: 'success',
            data: {
                section: newSection,
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
    const { sectionId } = req.params;
    try {
        yield models_1.Task.deleteMany({ section: sectionId });
        yield models_1.Section.findByIdAndDelete(sectionId);
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
