"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.roleSchema = void 0;
const mongoose_1 = require("mongoose");
const EzMongooseConnection_1 = __importDefault(require("../../../base/providers/EzMongooseConnection"));
const CollectionNames_1 = require("./CollectionNames");
exports.roleSchema = new mongoose_1.Schema({
    name: String,
    code: String
}, {
    timestamps: true
});
const Role = EzMongooseConnection_1.default.model(CollectionNames_1.CollectionNames.ROLE, exports.roleSchema);
exports.default = Role;
//# sourceMappingURL=Role.js.map