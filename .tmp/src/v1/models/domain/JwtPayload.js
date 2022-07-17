"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtPayload = void 0;
const JwtUser_1 = require("./JwtUser");
class JwtPayload {
    constructor(result) {
        this.user = new JwtUser_1.JwtUser(result);
        this.roles = result.roles.map(r => r.name);
        this.permissions = this.allPermissions(result);
    }
    /**
     * Resolves all permissions granted to this user through groups.
     */
    inheritedPermissions(user) {
        let returnPermissions = new Array();
        if (!user || !user.roles) {
            return returnPermissions;
        }
        for (let group of user.roles) {
            if (group.permissions) {
                for (let permission of group.permissions) {
                    returnPermissions.push(permission);
                }
            }
        }
        return returnPermissions.reduce((acc, current) => {
            const x = acc.find(item => item.id === current.id);
            if (!x) {
                return acc.concat([current]);
            }
            else {
                return acc;
            }
        }, []);
    }
    /**
     * Resolves all permissions granted to this user through groups or directly to the string enum format.
     * Also deduplicates the array.
     */
    allPermissions(user) {
        let returnPermissions = new Array();
        if (!user || !user.roles) {
            return returnPermissions;
        }
        for (let group of user.roles) {
            if (group.permissions) {
                for (let permission of group.permissions) {
                    returnPermissions.push(permission.code);
                }
            }
        }
        return Array.from(new Set(returnPermissions));
    }
}
exports.JwtPayload = JwtPayload;
//# sourceMappingURL=JwtPayload.js.map