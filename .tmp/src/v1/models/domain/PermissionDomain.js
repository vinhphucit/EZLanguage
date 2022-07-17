"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionDomain = void 0;
class PermissionDomain {
    constructor(result) {
        if (!result)
            return;
        this.id = result._id;
        this.name = result.name;
        this.code = result.code;
        this.createdAt = result.createdAt;
        this.updatedAt = result.updatedAt;
    }
}
exports.PermissionDomain = PermissionDomain;
//# sourceMappingURL=PermissionDomain.js.map