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
exports.UserService = void 0;
const BadRequestException_1 = require("../../base/exceptions/BadRequestException");
const NotFoundException_1 = require("../../base/exceptions/NotFoundException");
const typedi_1 = require("typedi");
const UserRepository_1 = require("../repositories/UserRepository");
const StringUtils_1 = require("../utils/StringUtils");
const CryptoUtils_1 = require("../utils/auth/CryptoUtils");
const RoleService_1 = require("./RoleService");
let UserService = class UserService {
    constructor(repo) {
        this.repo = repo;
    }
    create(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingUser = yield this.getByEmail(user.email);
            if (existingUser) {
                throw new BadRequestException_1.BadRequestException(`Email ${user.email} already existed`);
            }
            else {
                return yield this._createNewUser(user);
            }
        });
    }
    get(limit, start, sort, query) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repo.get(limit, start, sort, query);
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.repo.getById(id);
            if (!result)
                throw new NotFoundException_1.NotFoundException(`User ${id} doesn't exist`);
            return result;
        });
    }
    getByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.repo.get(`1`, `0`, undefined, `email%eq%${email}`);
            if (!result || result.totalItems == 0)
                return undefined;
            return result.items[0];
        });
    }
    update(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield user.save();
        });
    }
    updatePassword(user, password) {
        return __awaiter(this, void 0, void 0, function* () {
            user.password = yield CryptoUtils_1.CryptoUtils.hashPassword(password);
            return user.save();
        });
    }
    updateById(id, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const entity = yield this.getById(id);
            entity.firstName = (0, StringUtils_1.switchNull)(request.firstName, entity.firstName);
            entity.lastName = (0, StringUtils_1.switchNull)(request.lastName, entity.lastName);
            entity.address = (0, StringUtils_1.switchNull)(request.address, entity.address);
            entity.mobile = (0, StringUtils_1.switchNull)(request.mobile, entity.mobile);
            entity.title = (0, StringUtils_1.switchNull)(request.title, entity.title);
            if (request.roles) {
                const roles = yield this.roleService.getByIds(request.roles.map((r) => r.id));
                entity.roles = roles;
            }
            const updateEntity = yield this.repo.updateById(id, entity);
            return updateEntity;
        });
    }
    updateStatusByUser(user, status) {
        return __awaiter(this, void 0, void 0, function* () {
            user.status = status;
            return yield user.save();
        });
    }
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.getById(id);
            return this.repo.removeById(id);
        });
    }
    _createNewUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            let item = {
                password: user.password ? (yield CryptoUtils_1.CryptoUtils.hashPassword(user.password)) : undefined,
                firstName: user.firstName,
                lastName: user.lastName,
                title: user.title,
                address: user.address,
                email: user.email,
                mobile: user.mobile,
            };
            if (user.roles) {
                const roles = yield this.roleService.getByIds(user.roles.map((r) => r.id));
                item.roles = roles;
            }
            return this.repo.create(item);
        });
    }
};
__decorate([
    (0, typedi_1.Inject)(),
    __metadata("design:type", RoleService_1.RoleService)
], UserService.prototype, "roleService", void 0);
UserService = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [UserRepository_1.UserRepository])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=UserService.js.map