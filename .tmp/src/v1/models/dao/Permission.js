"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.permissionSchema = void 0;
const mongoose_1 = require("mongoose");
const EzMongooseConnection_1 = __importDefault(require("../../providers/EzMongooseConnection"));
const CollectionNames_1 = require("./CollectionNames");
exports.permissionSchema = new mongoose_1.Schema({
    name: String,
    code: String
}, {
    timestamps: true
});
const Permission = EzMongooseConnection_1.default.model(CollectionNames_1.CollectionNames.PERMISSION, exports.permissionSchema);
exports.default = Permission;
//# sourceMappingURL=Permission.js.map