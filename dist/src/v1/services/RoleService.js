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
let RoleService = class RoleService {
    constructor(repo) {
        this.repo = repo;
    }
    create(role) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(JSON.stringify(role));
            const existingRole = yield this.getByCode(role.code);
            if (existingRole) {
                throw new BadRequestException_1.BadRequestException(`Code ${role.code} already existed`);
            }
            let item = {
                name: role.name,
                code: role.code
            };
            console.log(JSON.stringify(item));
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
    getByCode(code) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.repo.get(`1`, `0`, undefined, `code%eq%${code}`);
            if (!result || result.totalItems == 0)
                return undefined;
            return result.items[0];
        });
    }
    updateById(id, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const entity = yield this.getById(id);
            const existingRole = yield this.getByCode(request.code);
            if (existingRole && existingRole.id !== entity.id) {
                throw new BadRequestException_1.BadRequestException(`Code ${request.code} already existed`);
            }
            entity.name = (0, StringUtils_1.switchNull)(request.name, entity.name);
            entity.code = (0, StringUtils_1.switchNull)(request.code, entity.code);
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
RoleService = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [RoleRepository_1.RoleRepository])
], RoleService);
exports.RoleService = RoleService;
//# sourceMappingURL=RoleService.js.map