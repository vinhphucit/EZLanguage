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
exports.RoleService = void 0;
const BadRequestException_1 = require("../../base/exceptions/BadRequestException");
const NotFoundException_1 = require("../../base/exceptions/NotFoundException");
const typedi_1 = require("typedi");
const RoleRepository_1 = require("../repositories/RoleRepository");
const StringUtils_1 = require("../utils/StringUtils");
const PermissionService_1 = require("./PermissionService");
let RoleService = class RoleService {
    constructor(repo) {
        this.repo = repo;
    }
    create(role) {
        return __awaiter(this, void 0, void 0, function* () {
            const foundRole = yield this.getByName(role.name);
            if (foundRole) {
                throw new BadRequestException_1.BadRequestException(`Role ${role.name} already existed`);
            }
            let item = {
                name: role.name
            };
            if (role.permissions) {
                const pers = yield this.permissionService.getByCodes(role.permissions);
                item.permissions = pers;
            }
            return this.repo.create(item);
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
    getByIds(ids) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repo.getByIds(ids);
        });
    }
    getByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.repo.get(`1`, `0`, undefined, `name%eq%${name}`);
            if (!result || result.totalItems == 0)
                return undefined;
            return result.items[0];
        });
    }
    updateById(id, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const entity = yield this.getById(id);
            if (request.name) {
                const existingNameEntity = yield this.getByName(request.name);
                if (entity.id !== existingNameEntity.id) {
                    throw new BadRequestException_1.BadRequestException(`Role ${request.name} already existed`);
                }
            }
            if (request.permissions) {
                const pers = yield this.permissionService.getByCodes(request.permissions);
                entity.permissions = pers;
            }
            entity.name = (0, StringUtils_1.switchNull)(request.name, entity.name);
            const updateEntity = yield this.repo.updateById(id, entity);
            return updateEntity;
        });
    }
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.getById(id);
            return this.repo.removeById(id);
        });
    }
};
__decorate([
    (0, typedi_1.Inject)(),
    __metadata("design:type", PermissionService_1.PermissionService)
], RoleService.prototype, "permissionService", void 0);
RoleService = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [RoleRepository_1.RoleRepository])
], RoleService);
exports.RoleService = RoleService;
//# sourceMappingURL=RoleService.js.map