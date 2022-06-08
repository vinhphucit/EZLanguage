"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtUser = void 0;
class JwtUser {
    constructor(user) {
        this.id = user.id;
        this.firstname = user.firstName;
        this.lastname = user.lastName;
        this.email = user.email;
        this.status = user.status;
    }
}
exports.JwtUser = JwtUser;
//# sourceMappingURL=JwtUser.js.map