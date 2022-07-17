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
exports.UserController = void 0;
const typedi_1 = require("typedi");
const UserService_1 = require("../services/UserService");
const SuccessResponse_1 = require("../../base/models/dto/response/success/SuccessResponse");
const CreateUserResponse_1 = require("../models/dto/response/user/CreateUserResponse");
const GetUsersResponse_1 = require("../models/dto/response/user/GetUsersResponse");
const GetUserByIdResponse_1 = require("../models/dto/response/user/GetUserByIdResponse");
const NoContentResponse_1 = require("../../base/models/dto/response/success/NoContentResponse");
const UpdateUserByIdResponse_1 = require("../models/dto/response/user/UpdateUserByIdResponse");
const UserChoreService_1 = require("../services/UserChoreService");
const UserDomain_1 = require("../models/domain/UserDomain");
let UserController = class UserController {
    constructor(service) {
        this.service = service;
    }
    create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const request = req.body;
                const result = yield this.service.create(UserDomain_1.UserDomain.fromCreateRequest(request));
                yield this.userChoreService.updateEmailVerificationCodeByUserId(result);
                next(new SuccessResponse_1.SuccessResponse(new CreateUserResponse_1.CreateUserResponse(result)));
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
                next(new SuccessResponse_1.SuccessResponse(new GetUsersResponse_1.GetUsersResponse(result.items.map((value) => new GetUserByIdResponse_1.GetUserByIdResponse(value)), result.start, result.limit, result.totalItems, result.sort, result.query)));
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
                next(new SuccessResponse_1.SuccessResponse(new GetUserByIdResponse_1.GetUserByIdResponse(result)));
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
                next(new SuccessResponse_1.SuccessResponse(new UpdateUserByIdResponse_1.UpdateUserByIdResponse(result)));
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
__decorate([
    (0, typedi_1.Inject)(),
    __metadata("design:type", UserChoreService_1.UserChoreService)
], UserController.prototype, "userChoreService", void 0);
UserController = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [UserService_1.UserService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=UserController.js.map