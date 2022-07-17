"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleDomain = void 0;
const PermissionDomain_1 = require("./PermissionDomain");
class RoleDomain {
    constructor(result) {
        if (!result)
            return;
        this.id = result._id;
        this.name = result.name;
        this.createdAt = result.createdAt;
        this.updatedAt = result.updatedAt;
        if (result.permissions) {
            this.permissions = result.permissions.map((i) => new PermissionDomain_1.PermissionDomain(i));
        }
    }
}
exports.RoleDomain = RoleDomain;
//# sourceMappingURL=RoleDomain.js.map