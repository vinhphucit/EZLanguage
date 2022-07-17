"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchema = void 0;
const mongoose_1 = require("mongoose");
const UserStatus_1 = require("../../enums/UserStatus");
const EzMongooseConnection_1 = __importDefault(require("../../providers/EzMongooseConnection"));
const CollectionNames_1 = require("./CollectionNames");
const Role_1 = require("./Role");
exports.userSchema = new mongoose_1.Schema({
    email: String,
    password: String,
    firstName: String,
    lastName: String,
    title: String,
    address: String,
    mobile: String,
    status: {
        type: String,
        enum: [UserStatus_1.UserStatus.NOT_ACTIVE, UserStatus_1.UserStatus.ACTIVE, UserStatus_1.UserStatus.BLOCK],
        default: UserStatus_1.UserStatus.NOT_ACTIVE,
    },
    roles: [Role_1.roleSchema],
}, {
    timestamps: true,
});
const User = EzMongooseConnection_1.default.model(CollectionNames_1.CollectionNames.USER, exports.userSchema);
exports.default = User;
//# sourceMappingURL=User.js.map