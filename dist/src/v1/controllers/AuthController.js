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
let AuthController = class AuthController {
    constructor(authService, userService) {
        this.authService = authService;
        this.userService = userService;
    }
    signUp(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const rq = req.body;
                const user = yield this.userService.create(rq);
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
                let decoded;
                try {
                    decoded = JwtUtils_1.JwtUtils.verifyJwtToken(rq.token);
                }
                catch (error) {
                    throw new BadRequestException_1.BadRequestException("AccessToken is not in valid format");
                }
                const found_user = yield this.userService.getById(decoded["id"]);
                if (!found_user) {
                    throw new NotFoundException_1.NotFoundException(`User not found`);
                }
                if (found_user.status !== UserStatus_1.UserStatus.ACTIVE) {
                    throw new BadRequestException_1.BadRequestException(`User is not activated`);
                }
                const response = this.authService.generateAccessToken(found_user);
                next(new SuccessResponse_1.SuccessResponse(response));
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
                const response = JwtUtils_1.JwtUtils.createReset(existingUser);
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
                const response = JwtUtils_1.JwtUtils.createReset(existingUser);
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
        UserService_1.UserService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=AuthController.js.map