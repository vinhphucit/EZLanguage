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
const BadRequestException_1 = require("../../base/exceptions/BadRequestException");
const NotFoundException_1 = require("../../base/exceptions/NotFoundException");
const typedi_1 = require("typedi");
const UserRepository_1 = require("../repositories/UserRepository");
const UserStatus_1 = require("../enums/UserStatus");
const InternalServerException_1 = require("../../base/exceptions/InternalServerException");
const Env_1 = require("../../Env");
const SignInResponse_1 = require("../models/dto/response/auth/SignInResponse");
const JwtUtils_1 = require("../utils/auth/JwtUtils");
let AuthService = class AuthService {
    constructor(repo) {
        this.repo = repo;
    }
    generateAccessToken(found_user) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!found_user)
                throw new InternalServerException_1.InternalServerException("User is not found");
            let newAuth = new SignInResponse_1.SignInResponse();
            const timestamp_accesstoken_expiry = Math.floor(Date.now() / 1000) + Env_1.env.auth.accessTokenExpiresIn * 60;
            newAuth.accessToken = JwtUtils_1.JwtUtils.createAccess(found_user, timestamp_accesstoken_expiry);
            newAuth.accessTokenExpiresAt = timestamp_accesstoken_expiry;
            //Create the refresh token
            const timestamp_refresh_expiry = Math.floor(Date.now() / 1000) + Env_1.env.auth.refreshTokenExpiresIn * 60;
            newAuth.refreshToken = JwtUtils_1.JwtUtils.createRefresh(found_user, timestamp_refresh_expiry);
            newAuth.refreshTokenExpiresAt = timestamp_refresh_expiry;
            return newAuth;
        });
    }
    refreshToken(refreshRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            let decoded;
            try {
                decoded = JwtUtils_1.JwtUtils.verifyJwtToken(refreshRequest.token);
            }
            catch (error) {
                throw new BadRequestException_1.BadRequestException("AccessToken is not in valid format");
            }
            const found_user = yield this.repo.getById(decoded["id"]);
            if (!found_user) {
                throw new NotFoundException_1.NotFoundException(`User not found`);
            }
            if (found_user.status !== UserStatus_1.UserStatus.ACTIVE) {
                throw new BadRequestException_1.BadRequestException(`User is not activated`);
            }
            return this.generateAccessToken(found_user);
        });
    }
};
AuthService = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [UserRepository_1.UserRepository])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=AuthService.js.map