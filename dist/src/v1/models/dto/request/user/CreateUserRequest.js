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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserRequest = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const IsNotEmptyString_1 = require("../../../../utils/validation/IsNotEmptyString");
const UserRoleRequest_1 = require("./UserRoleRequest");
class CreateUserRequest {
}
__decorate([
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.Length)(1, 100),
    (0, IsNotEmptyString_1.IsNotEmptyString)(),
    __metadata("design:type", String)
], CreateUserRequest.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(1, 100),
    (0, IsNotEmptyString_1.IsNotEmptyString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateUserRequest.prototype, "firstName", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(1, 50),
    (0, IsNotEmptyString_1.IsNotEmptyString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateUserRequest.prototype, "lastName", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(1, 50),
    (0, IsNotEmptyString_1.IsNotEmptyString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateUserRequest.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(1, 50),
    (0, IsNotEmptyString_1.IsNotEmptyString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateUserRequest.prototype, "address", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(1, 50),
    (0, IsNotEmptyString_1.IsNotEmptyString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateUserRequest.prototype, "mobile", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => UserRoleRequest_1.UserRoleRequest),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CreateUserRequest.prototype, "roles", void 0);
exports.CreateUserRequest = CreateUserRequest;
//# sourceMappingURL=CreateUserRequest.js.map