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
exports.PermissionController = void 0;
const typedi_1 = require("typedi");
const SuccessResponse_1 = require("../../base/models/dto/response/success/SuccessResponse");
const PermissionService_1 = require("../services/PermissionService");
const CreatePermissionResponse_1 = require("../models/dto/response/permission/CreatePermissionResponse");
const GetPermissionsResponse_1 = require("../models/dto/response/permission/GetPermissionsResponse");
const GetPermissionByIdResponse_1 = require("../models/dto/response/permission/GetPermissionByIdResponse");
const NoContentResponse_1 = require("../../base/models/dto/response/success/NoContentResponse");
const UpdatePermissionByIdResponse_1 = require("../models/dto/response/permission/UpdatePermissionByIdResponse");
let PermissionController = class PermissionController {
    constructor(service) {
        this.service = service;
    }
    create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const request = req.body;
                const result = yield this.service.create(request);
                next(new SuccessResponse_1.SuccessResponse(new CreatePermissionResponse_1.CreatePermissionResponse(result)));
            }
            catch (e) {
                return next(e);
            }
        });
    }
    get(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { limit, start, sort, query } = req.query;
                const result = yield this.service.get(limit, start, sort, query);
                next(new SuccessResponse_1.SuccessResponse(new GetPermissionsResponse_1.GetPermissionsResponse(result.items.map(value => new GetPermissionByIdResponse_1.GetPermissionByIdResponse(value)), result.start, result.limit, result.totalItems, result.sort, result.query)));
            }
            catch (e) {
                return next(e);
            }
        });
    }
    getById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const result = yield this.service.getById(id);
                next(new SuccessResponse_1.SuccessResponse(new GetPermissionByIdResponse_1.GetPermissionByIdResponse(result)));
            }
            catch (e) {
                return next(e);
            }
        });
    }
    updateById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const request = req.body;
                const result = yield this.service.updateById(id, request);
                next(new SuccessResponse_1.SuccessResponse(new UpdatePermissionByIdResponse_1.UpdatePermissionByIdResponse(result)));
            }
            catch (e) {
                return next(e);
            }
        });
    }
    deleteById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                yield this.service.deleteById(id);
                next(new NoContentResponse_1.NoContentResponse());
            }
            catch (e) {
                return next(e);
            }
        });
    }
};
PermissionController = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [PermissionService_1.PermissionService])
], PermissionController);
exports.PermissionController = PermissionController;
//# sourceMappingURL=PermissionController.js.map