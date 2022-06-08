"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshTokenSchema = void 0;
const mongoose_1 = require("mongoose");
const EzMongooseConnection_1 = __importDefault(require("../../providers/EzMongooseConnection"));
const CollectionNames_1 = require("./CollectionNames");
exports.refreshTokenSchema = new mongoose_1.Schema({
    refreshToken: String,
    userId: String,
    expiresIn: Number,
}, {
    timestamps: true
});
const RefreshToken = EzMongooseConnection_1.default.model(CollectionNames_1.CollectionNames.REFRESH_TOKEN, exports.refreshTokenSchema);
exports.default = RefreshToken;
//# sourceMappingURL=RefreshToken.js.map