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
exports.UserChoreService = void 0;
const BadRequestException_1 = require("../../base/exceptions/BadRequestException");
const NotFoundException_1 = require("../../base/exceptions/NotFoundException");
const typedi_1 = require("typedi");
const UserChoreRepository_1 = require("../repositories/UserChoreRepository");
const DateUtils_1 = require("../utils/DateUtils");
const Env_1 = require("../../Env");
let UserChoreService = class UserChoreService {
    constructor(repo) {
        this.repo = repo;
    }
    getByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.repo.get(`1`, `0`, undefined, `userId%eq%${userId}`);
            if (!result || result.totalItems == 0)
                return undefined;
            return result.items[0];
        });
    }
    updateEmailVerificationCodeByUserId(userId, code) {
        return __awaiter(this, void 0, void 0, function* () {
            const entity = yield this.getByUserId(userId);
            if (!entity) {
                const item = {
                    userId,
                    emailVerificationCode: code,
                    emailVerificationExpiredAt: (0, DateUtils_1.timeInSecondAfter)(Env_1.env.auth.emailVerificationExpiresIn),
                };
                return yield this.repo.create(item);
            }
            else {
                entity.emailVerificationCode = code;
                entity.emailVerificationExpiredAt = (0, DateUtils_1.timeInSecondAfter)(Env_1.env.auth.emailVerificationExpiresIn);
                return yield this.repo.updateById(entity.id, entity);
            }
        });
    }
    verifyEmailVerificationCodeByUserId(userId, code) {
        return __awaiter(this, void 0, void 0, function* () {
            const entity = yield this.getByUserId(userId);
            if (!entity)
                throw new NotFoundException_1.NotFoundException(`UserId ${userId} not found`);
            if ((0, DateUtils_1.nowAfter)(entity.emailVerificationExpiredAt) ||
                entity.emailVerificationTriedCount > Env_1.env.auth.emailVerificationMaxTryCount) {
                throw new BadRequestException_1.BadRequestException(`This code is not valid`);
            }
            entity.emailVerificationTriedCount++;
            if (entity.emailVerificationCode !== code) {
                yield this.repo.updateById(entity.id, entity);
                throw new BadRequestException_1.BadRequestException(`This code is not valid`);
            }
            else {
                entity.emailVerificationActivatedAt = new Date();
                yield this.repo.updateById(entity.id, entity);
            }
            return entity;
        });
    }
    updateResetPasswordCodeByUserId(userId, code) {
        return __awaiter(this, void 0, void 0, function* () {
            const entity = yield this.getByUserId(userId);
            if (!entity) {
                const item = {
                    userId,
                    resetPasswordCode: code,
                    resetPasswordExpiredAt: (0, DateUtils_1.timeInSecondAfter)(Env_1.env.auth.resetPasswordExpiresIn),
                };
                return yield this.repo.create(item);
            }
            else {
                entity.resetPasswordCode = code;
                entity.resetPasswordExpiredAt = (0, DateUtils_1.timeInSecondAfter)(Env_1.env.auth.resetPasswordExpiresIn);
            }
            return yield this.repo.updateById(entity.id, entity);
        });
    }
    verifyRefreshTokenByUserId(userId, code) {
        return __awaiter(this, void 0, void 0, function* () {
            const entity = yield this.getByUserId(userId);
            if (!entity)
                throw new NotFoundException_1.NotFoundException(`UserId ${userId} not found`);
            if ((0, DateUtils_1.nowAfter)(entity.resetPasswordExpiredAt) ||
                entity.resetPasswordTriedCount > Env_1.env.auth.resetPasswordMaxTryCount) {
                throw new BadRequestException_1.BadRequestException(`This code is not valid`);
            }
            entity.resetPasswordTriedCount++;
            if (entity.resetPasswordCode !== code) {
                yield this.repo.updateById(entity.id, entity);
                throw new BadRequestException_1.BadRequestException(`This code is not valid`);
            }
            else {
                entity.emailVerificationActivatedAt = new Date();
                yield this.repo.updateById(entity.id, entity);
            }
            return entity;
        });
    }
};
UserChoreService = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [UserChoreRepository_1.UserChoreRepository])
], UserChoreService);
exports.UserChoreService = UserChoreService;
//# sourceMappingURL=UserChoreService.js.map