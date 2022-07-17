"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPasswordSchema = void 0;
const mongoose_1 = require("mongoose");
const EzMongooseConnection_1 = __importDefault(require("../../providers/EzMongooseConnection"));
const CollectionNames_1 = require("./CollectionNames");
exports.resetPasswordSchema = new mongoose_1.Schema({
    token: String,
    userId: String,
    expiresIn: Number,
    active: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});
const ResetPassword = EzMongooseConnection_1.default.model(CollectionNames_1.CollectionNames.RESET_PASSWORD, exports.resetPasswordSchema);
exports.default = ResetPassword;
//# sourceMappingURL=ResetPassword.js.map