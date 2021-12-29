"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.comparePassword = exports.hashPassword = void 0;
var bcryptjs_1 = __importDefault(require("bcryptjs"));
function hashPassword(password) {
    return bcryptjs_1.default.hashSync(password, 8);
}
exports.hashPassword = hashPassword;
function comparePassword(requestPassword, hashPassword) {
    return bcryptjs_1.default.compareSync(requestPassword, hashPassword);
}
exports.comparePassword = comparePassword;
