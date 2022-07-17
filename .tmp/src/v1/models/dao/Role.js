"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.roleSchema = void 0;
const mongoose_1 = require("mongoose");
const EzMongooseConnection_1 = __importDefault(require("../../providers/EzMongooseConnection"));
const CollectionNames_1 = require("./CollectionNames");
const Permission_1 = require("./Permission");
exports.roleSchema = new mongoose_1.Schema({
    name: String,
    permissions: [Permission_1.permissionSchema]
}, {
    timestamps: true
});
const Role = EzMongooseConnection_1.default.model(CollectionNames_1.CollectionNames.ROLE, exports.roleSchema);
exports.default = Role;
//# sourceMappingURL=Role.js.map