"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleDomain = void 0;
class RoleDomain {
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
exports.RoleDomain = RoleDomain;
//# sourceMappingURL=RoleDomain.js.map