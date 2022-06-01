"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchema = void 0;
const mongoose_1 = require("mongoose");
const EzMongooseConnection_1 = __importDefault(require("../../../base/providers/EzMongooseConnection"));
const CollectionNames_1 = require("./CollectionNames");
const Role_1 = require("./Role");
exports.userSchema = new mongoose_1.Schema({
    password: String,
    firstName: String,
    lastName: String,
    title: String,
    address: String,
    email: String,
    mobile: String,
    roles: [Role_1.roleSchema]
}, {
    timestamps: true
});
const User = EzMongooseConnection_1.default.model(CollectionNames_1.CollectionNames.USER, exports.userSchema);
exports.default = User;
//# sourceMappingURL=User.js.map