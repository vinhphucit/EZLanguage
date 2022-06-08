import {NextFunction, Request, RequestHandler, Response} from "express";
import { BadRequestException } from "../../base/exceptions/BadRequestException";
import { RequiredPermissions } from "../utils/auth/RequiredPermissions";

// https://stackoverflow.com/questions/45986594/this-is-undefined-in-express-js-router/45987714


/**
 * This Middleware is for role, permissions checking
 * @param condition
 * @constructor
 */
export function AuthorizationMiddleware(requiredPermission: string): RequestHandler {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            
            
            const {payload} = req;
            
            let payloadPermissions: string;
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
                throw new BadRequestException("You don't have permission for this api")
            }
            
            // // verify role is in payload.role
            // if (!verifyRoles(requiredRole, payloadRoles)) {
            //     throw new AuthenticationPermissionMissingException()
            // }
            next()
        } catch (ex) {
            return next(ex)
        }
    }
}

/**
 * check if required Permissions are in payload.permissions
 * @param permission required permission
 * @param permissions permissions in payload
 */
function verifyPermissions(permission: string | string[], permissions: string): boolean {
    return isStringInAnotherString(permission, permissions);
}

/**
 * check if required Role are in payload.role
 * @param role required role
 * @param roles role in payload
 */
function verifyRoles(role: string | string[], roles: string): boolean {
    return isStringInAnotherString(role, roles);
}

function isStringInAnotherString(permission: string | string[], permissions: string): boolean {

    let requiredPermissions: string[] = [];
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
