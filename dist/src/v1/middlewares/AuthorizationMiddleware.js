"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthorizationMiddleware = void 0;
const BadRequestException_1 = require("../../base/exceptions/BadRequestException");
// https://stackoverflow.com/questions/45986594/this-is-undefined-in-express-js-router/45987714
/**
 * This Middleware is for role, permissions checking
 * @param condition
 * @constructor
 */
function AuthorizationMiddleware(requiredPermission) {
    return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        try {
            const { payload } = req;
            let payloadPermissions;
            // let payloadRoles: string;
            // let requiredPermission: string | string[];
            // let requiredRole: string | string[];
            // if (condition) {
            //     if (condition.permission) {
            //         requiredPermission = condition.permission;
            //     }
            //     // if (condition.role) {
            //     //     requiredRole = condition.role;
            //     // }
            // }
            if (payload) {
                payloadPermissions = payload.permissions;
                // payloadRoles = req.payload.role;
            }
            // verify permission is in payload.permissions
            if (!verifyPermissions(requiredPermission, payloadPermissions)) {
                throw new BadRequestException_1.BadRequestException("You don't have permission for this api");
            }
            // // verify role is in payload.role
            // if (!verifyRoles(requiredRole, payloadRoles)) {
            //     throw new AuthenticationPermissionMissingException()
            // }
            next();
        }
        catch (ex) {
            return next(ex);
        }
    });
}
exports.AuthorizationMiddleware = AuthorizationMiddleware;
/**
 * check if required Permissions are in payload.permissions
 * @param permission required permission
 * @param permissions permissions in payload
 */
function verifyPermissions(permission, permissions) {
    return isStringInAnotherString(permission, permissions);
}
/**
 * check if required Role are in payload.role
 * @param role required role
 * @param roles role in payload
 */
function verifyRoles(role, roles) {
    return isStringInAnotherString(role, roles);
}
function isStringInAnotherString(permission, permissions) {
    let requiredPermissions = [];
    if (typeof permission === "string") {
        requiredPermissions = permission.split(" ");
    }
    if (Array.isArray(permission)) {
        requiredPermissions = permission;
    }
    const userPermissionsArr = `${permissions || ""}`.split(" ");
    const missingPermissions = requiredPermissions.filter(permission => !userPermissionsArr.includes(permission));
    return !missingPermissions.length;
}
//# sourceMappingURL=AuthorizationMiddleware.js.map