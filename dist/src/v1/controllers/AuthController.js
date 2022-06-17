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
exports.AuthController = void 0;
const typedi_1 = require("typedi");
const UserService_1 = require("../services/UserService");
const NoContentResponse_1 = require("../../base/models/dto/response/success/NoContentResponse");
const SuccessResponse_1 = require("../../base/models/dto/response/success/SuccessResponse");
const AuthService_1 = require("../services/AuthService");
const NotFoundException_1 = require("../../base/exceptions/NotFoundException");
const BadRequestException_1 = require("../../base/exceptions/BadRequestException");
const UserStatus_1 = require("../enums/UserStatus");
const CryptoUtils_1 = require("../utils/auth/CryptoUtils");
const JwtUtils_1 = require("../utils/auth/JwtUtils");
const RefreshTokenService_1 = require("../services/RefreshTokenService");
const RefreshTokenStatus_1 = require("../enums/RefreshTokenStatus");
const UserChoreService_1 = require("../services/UserChoreService");
const StringUtils_1 = require("../utils/StringUtils");
const RequestUtils_1 = require("../utils/RequestUtils");
const UserDomain_1 = require("../models/domain/UserDomain");
let AuthController = class AuthController {
    constructor(authService, userService, userChoreService, refreshTokenService) {
        this.authService = authService;
        this.userService = userService;
        this.userChoreService = userChoreService;
        this.refreshTokenService = refreshTokenService;
    }
    signUp(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const rq = req.body;
                const user = yield this.userService.create(yield UserDomain_1.UserDomain.fromRegisterRequest(rq));
                yield this.userChoreService.updateEmailVerificationCodeByUserId(user);
                next(new SuccessResponse_1.SuccessResponse(user));
            }
            catch (e) {
                return next(e);
            }
        });
    }
    signIn(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const rq = req.body;
                const existingUser = yield this.userService.getByEmail(rq.email);
                if (!existingUser) {
                    throw new NotFoundException_1.NotFoundException(`User ${rq.email} doesn't exist`);
                }
                if (existingUser.status !== UserStatus_1.UserStatus.ACTIVE) {
                    throw new BadRequestException_1.BadRequestException("User has not activated yet");
                }
                if (!(yield CryptoUtils_1.CryptoUtils.comparePassword(existingUser.password, rq.password))) {
                    throw new BadRequestException_1.BadRequestException("Password is not correct");
                }
                const response = yield this.authService.generateAccessToken(existingUser);
                next(new SuccessResponse_1.SuccessResponse(response));
            }
            catch (e) {
                return next(e);
            }
        });
    }
    refreshToken(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const rq = req.body;
                let token = yield JwtUtils_1.JwtUtils.verifyJwtToken(rq.token);
                const foundRefreshToken = yield this.refreshTokenService.getById(token.refreshTokenId);
                if (!foundRefreshToken ||
                    foundRefreshToken.status !== RefreshTokenStatus_1.RefreshTokenStatus.ACTIVE) {
                    throw new BadRequestException_1.BadRequestException("Invalid RefreshToken");
                }
                const foundUser = yield this.userService.getById(token.userId);
                if (foundUser.status !== UserStatus_1.UserStatus.ACTIVE) {
                    throw new BadRequestException_1.BadRequestException(`User is not activated`);
                }
                const response = yield this.authService.generateAccessToken(foundUser, token.refreshTokenId);
                next(new SuccessResponse_1.SuccessResponse(response));
            }
            catch (e) {
                return next(e);
            }
        });
    }
    signOut(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const rq = req.body;
                let token = yield JwtUtils_1.JwtUtils.verifyJwtToken(rq.token);
                const foundRefreshToken = yield this.refreshTokenService.getById(token.refreshTokenId);
                if (!foundRefreshToken ||
                    foundRefreshToken.status !== RefreshTokenStatus_1.RefreshTokenStatus.ACTIVE) {
                    throw new BadRequestException_1.BadRequestException("Invalid RefreshToken");
                }
                yield this.authService.revokeRefreshToken(foundRefreshToken);
                next(new NoContentResponse_1.NoContentResponse());
            }
            catch (e) {
                return next(e);
            }
        });
    }
    resetPassword(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const rq = req.body;
                const existingUser = yield this.userService.getByEmail(rq.email);
                if (!existingUser) {
                    throw new NotFoundException_1.NotFoundException(`User ${rq.email} doesn't exist`);
                }
                if (existingUser.status !== UserStatus_1.UserStatus.ACTIVE) {
                    throw new BadRequestException_1.BadRequestException("User has not activated yet");
                }
                const verificationCode = (0, StringUtils_1.genRandomString)(10);
                yield this.userChoreService.updateResetPasswordCodeByUserId(existingUser.id, verificationCode);
                next(new NoContentResponse_1.NoContentResponse());
            }
            catch (e) {
                return next(e);
            }
        });
    }
    confirmResetPassword(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const rq = req.body;
                const existingUser = yield this.userService.getByEmail(rq.email);
                if (!existingUser) {
                    throw new NotFoundException_1.NotFoundException(`User ${rq.email} doesn't exist`);
                }
                if (existingUser.status !== UserStatus_1.UserStatus.ACTIVE) {
                    throw new BadRequestException_1.BadRequestException("User has not activated yet");
                }
                yield this.userChoreService.verifyResetPasswordCodeById(existingUser.id, rq.token);
                yield this.userService.updatePassword(existingUser, rq.password);
                next(new NoContentResponse_1.NoContentResponse());
            }
            catch (e) {
                return next(e);
            }
        });
    }
    changePassword(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const rq = req.body;
                const userId = (0, RequestUtils_1.getRequestUserId)(req);
                const existingUser = yield this.userService.getById(userId);
                if (existingUser.status !== UserStatus_1.UserStatus.ACTIVE) {
                    throw new BadRequestException_1.BadRequestException("User has not activated yet");
                }
                if (!(yield CryptoUtils_1.CryptoUtils.comparePassword(existingUser.password, rq.oldPassword))) {
                    throw new BadRequestException_1.BadRequestException("Password is not correct");
                }
                this.userService.updatePassword(existingUser, rq.newPassword);
                next(new NoContentResponse_1.NoContentResponse());
            }
            catch (e) {
                return next(e);
            }
        });
    }
    verifyEmail(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const rq = req.body;
                const existingUser = yield this.userService.getByEmail(rq.email);
                if (!existingUser) {
                    throw new NotFoundException_1.NotFoundException(`User ${rq.email} doesn't exist`);
                }
                if (existingUser.status === UserStatus_1.UserStatus.NOT_ACTIVE) {
                    yield this.userChoreService.verifyEmailVerificationCodeByUserId(existingUser.id, rq.code);
                    yield this.userService.updateStatusByUser(existingUser, UserStatus_1.UserStatus.ACTIVE);
                }
                next(new NoContentResponse_1.NoContentResponse());
            }
            catch (e) {
                return next(e);
            }
        });
    }
};
AuthController = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [AuthService_1.AuthService,
        UserService_1.UserService,
        UserChoreService_1.UserChoreService,
        RefreshTokenService_1.RefreshTokenService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=AuthController.js.map