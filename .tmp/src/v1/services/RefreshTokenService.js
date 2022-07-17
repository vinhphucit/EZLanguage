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
exports.RefreshTokenService = void 0;
const NotFoundException_1 = require("../../base/exceptions/NotFoundException");
const typedi_1 = require("typedi");
const RefreshTokenRepository_1 = require("../repositories/RefreshTokenRepository");
let RefreshTokenService = class RefreshTokenService {
    constructor(repo) {
        this.repo = repo;
    }
    create(userId, expiresAt) {
        return __awaiter(this, void 0, void 0, function* () {
            let item = {
                userId,
                expiresAt,
            };
            return this.repo.create(item);
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.repo.getById(id);
            if (!result)
                throw new NotFoundException_1.NotFoundException(`RefreshToken ${id} doesn't exist`);
            return result;
        });
    }
    updateRefreshTokenChain(current, previous) {
        return __awaiter(this, void 0, void 0, function* () {
            const foundToken = yield this.getById(previous);
            let foundTokenChain = foundToken.tokenChain;
            if (!foundTokenChain) {
                foundTokenChain = [];
            }
            foundTokenChain.push(foundToken.id);
            current.tokenChain = foundTokenChain;
            return this.repo.updateById(current.id, current);
        });
    }
};
RefreshTokenService = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [RefreshTokenRepository_1.RefreshTokenRepository])
], RefreshTokenService);
exports.RefreshTokenService = RefreshTokenService;
//# sourceMappingURL=RefreshTokenService.js.map