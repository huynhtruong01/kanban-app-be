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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const mongoose_1 = __importDefault(require("mongoose"));
const schemaOptions_1 = require("./../config/schemaOptions");
const userSchema = new mongoose_1.default.Schema({
    username: {
        type: String,
        require: [true, 'User must have a username.'],
        unique: true,
        trim: true,
    },
    fullname: {
        type: String,
        require: [true, 'User must have fullname.'],
        trim: true,
    },
    password: {
        type: String,
        minLength: [6, 'Password must have at least six characters.'],
    },
    confirmPassword: {
        type: String,
        minLength: [6, 'Password must have at least six characters.'],
    },
}, schemaOptions_1.schemaOptions);
userSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (this.isModified('password') && this.password) {
            this.password = yield bcrypt_1.default.hash(this.password, 8);
            this.confirmPassword = undefined;
        }
        next();
    });
});
exports.User = mongoose_1.default.model('User', userSchema);
