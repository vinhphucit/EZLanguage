"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtUtils = void 0;
const fs_1 = __importDefault(require("fs"));
const jsonwebtoken = __importStar(require("jsonwebtoken"));
const path_1 = __importDefault(require("path"));
const JwtPayload_1 = require("../../models/domain/JwtPayload");
const Env_1 = require("../../../Env");
/**
 * This class is responsible for all things JJWT creation.
 */
class JwtUtils {
    /**
     * Creates a new refresh token for a given user
     * @param user User entity that the refresh token shall be created for
     * @param expiry_timestamp Timestamp for the token expiry. Will be generated if not provided.
     */
    static createRefresh(user, expiry_timestamp) {
        if (!expiry_timestamp) {
            expiry_timestamp = Math.floor(Date.now() / 1000) + 10 * 36000;
        }
        return jsonwebtoken.sign({
            id: user.id,
            exp: expiry_timestamp,
        }, this.privateKey);
    }
    /**
     * Creates a new access token for a given user
     * @param user User entity that the access token shall be created for
     * @param expiry_timestamp Timestamp for the token expiry. Will be generated if not provided.
     */
    static createAccess(user, expiry_timestamp) {
        let jwtPayload = new JwtPayload_1.JwtPayload(user);
        if (!expiry_timestamp) {
            expiry_timestamp = Math.floor(Date.now() / 1000) + 10 * 36000;
        }
        return jsonwebtoken.sign(Object.assign(Object.assign({}, jwtPayload), { exp: expiry_timestamp }), this.privateKey);
    }
    /**
     * Creates a new password reset token for a given user.
     * The token is valid for 15 minutes or 1 use - whatever comes first.
     * @param user User entity that the password reset token shall be created for
     */
    static createReset(user) {
        let expiry_timestamp = Math.floor(Date.now() / 1000) + Env_1.env.auth.forgetPasswordTokenExpiresIn * 60 * 60;
        return jsonwebtoken.sign({
            id: user.id,
            exp: expiry_timestamp
        }, this.privateKey);
    }
    /**
     * Creates a registerToken for registration.
     * @param  User entity contains email and password only
     */
    // public static createRegisterToken(email: string, password: string, expiredIn: Date): string {
    //     const user = new UserDomain();
    //     user.email = email;
    //     user.password = password;
    //     let expiry_timestamp = Math.floor(expiredIn.getTime() / 1000)
    //     return jsonwebtoken.sign({
    //         user: user.id,
    //         exp: expiry_timestamp
    //     }, this.privateKey);
    // }
    static verifyJwtToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => jsonwebtoken.verify(token, JwtUtils.privateKey, (err, data) => {
                if (err) {
                    return reject(err);
                }
                return resolve(data);
            }));
        });
    }
}
exports.JwtUtils = JwtUtils;
JwtUtils.privateKey = fs_1.default.readFileSync(path_1.default.resolve(__dirname, '../../../../assets/private.key'), 'utf8');
//# sourceMappingURL=JwtUtils.js.map