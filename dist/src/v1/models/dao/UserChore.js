"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userChoseSchema = void 0;
const mongoose_1 = require("mongoose");
const EzMongooseConnection_1 = __importDefault(require("../../providers/EzMongooseConnection"));
const CollectionNames_1 = require("./CollectionNames");
exports.userChoseSchema = new mongoose_1.Schema({
    userId: String,
    email: String,
    emailVerificationCode: String,
    emailVerificationExpiredAt: {
        type: Number,
        default: 0,
    },
    emailVerificationTriedCount: {
        type: Number,
        default: 0,
    },
    emailVerificationActivatedAt: Date,
    resetPasswordCode: String,
    resetPasswordExpiredAt: {
        type: Number,
        default: 0,
    },
    resetPasswordTriedCount: {
        type: Number,
        default: 0,
    },
}, {
    timestamps: true,
});
const UserChore = EzMongooseConnection_1.default.model(CollectionNames_1.CollectionNames.USER_CHORE, exports.userChoseSchema);
exports.default = UserChore;
//# sourceMappingURL=UserChore.js.map