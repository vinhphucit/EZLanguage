"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDomain = void 0;
const RoleDomain_1 = require("./RoleDomain");
class UserDomain {
    constructor(result) {
        if (!result)
            return;
        this.id = result._id;
        // this.password = result.password;
        this.firstName = result.firstName;
        this.lastName = result.lastName;
        this.title = result.title;
        this.address = result.address;
        this.email = result.email;
        this.mobile = result.mobile;
        this.status = result.status;
        this.roles = result.roles.map(r => new RoleDomain_1.RoleDomain(r));
        this.createdAt = result.createdAt;
        this.updatedAt = result.updatedAt;
    }
}
exports.UserDomain = UserDomain;
//# sourceMappingURL=UserDomain.js.map