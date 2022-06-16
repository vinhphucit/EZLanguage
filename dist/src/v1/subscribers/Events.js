"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
//Prefix because of versioning
const prefix = `${path_1.default.relative(process.cwd(), __filename).substr(0, path_1.default.relative(process.cwd(), __filename).lastIndexOf('/') + 1)}`;
exports.default = {
    auth: {
        register: `${prefix}onUserRegistered`,
        resetPassword: `${prefix}onUserResetPassword`
    },
};
//# sourceMappingURL=Events.js.map