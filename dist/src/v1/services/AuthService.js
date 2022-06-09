"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const typedi_1 = require("typedi");
const InternalServerException_1 = require("../../base/exceptions/InternalServerException");
const Env_1 = require("../../Env");
const SignInResponse_1 = require("../models/dto/response/auth/SignInResponse");
const JwtUtils_1 = require("../utils/auth/JwtUtils");
const DateUtils_1 = require("../utils/DateUtils");
const RefreshTokenService_1 = require("./RefreshTokenService");
const RefreshTokenStatus_1 = require("../enums/RefreshTokenStatus");
const UserService_1 = require("./UserService");
const RefreshTokenRepository_1 = require("../repositories/RefreshTokenRepository");
let AuthService = class AuthService {
    constructor(repo) {
        this.repo = repo;
    }
    generateAccessToken(user, previousRefreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!user)
                throw new InternalServerException_1.InternalServerException("User is not found");
            const expiryAccessToken = (0, DateUtils_1.timeInSecondAfter)(Env_1.env.auth.accessTokenExpiresIn);
            const expiryRefreshToken = (0, DateUtils_1.timeInSecondAfter)(Env_1.env.auth.refreshTokenExpiresIn);
            const newRefreshToken = yield this.refreshTokenService.create(user.id, expiryRefreshToken);
            const refreshToken = JwtUtils_1.JwtUtils.createRefreshToken(user, newRefreshToken.id, expiryRefreshToken);
            if (previousRefreshToken) {
                yield this.refreshTokenService.updateRefreshTokenChain(newRefreshToken, previousRefreshToken);
            }
            let newAuth = new SignInResponse_1.SignInResponse();
            newAuth.accessToken = JwtUtils_1.JwtUtils.createAccess(user, expiryAccessToken);
            newAuth.accessTokenExpiresAt = expiryAccessToken;
            newAuth.refreshToken = refreshToken;
            newAuth.refreshTokenExpiresAt = expiryRefreshToken;
            return newAuth;
        });
    }
    revokeRefreshToken(foundRefreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            let tokenChain = foundRefreshToken.tokenChain;
            if (!tokenChain) {
                tokenChain = [];
            }
            tokenChain.push(foundRefreshToken.id);
            yield this.repo.updateStatusByIds(tokenChain, RefreshTokenStatus_1.RefreshTokenStatus.BLOCK);
        });
    }
};
__decorate([
    (0, typedi_1.Inject)(),
    __metadata("design:type", RefreshTokenService_1.RefreshTokenService)
], AuthService.prototype, "refreshTokenService", void 0);
__decorate([
    (0, typedi_1.Inject)(),
    __metadata("design:type", UserService_1.UserService)
], AuthService.prototype, "userService", void 0);
AuthService = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [RefreshTokenRepository_1.RefreshTokenRepository])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=AuthService.js.map