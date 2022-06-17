"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDomain = void 0;
const RoleService_1 = require("../../services/RoleService");
const CryptoUtils_1 = require("../../utils/auth/CryptoUtils");
const typedi_1 = __importDefault(require("typedi"));
const RoleDomain_1 = require("./RoleDomain");
class UserDomain {
    constructor(result) {
        if (!result)
            return;
        this.id = result._id;
        // this.password = result.password;
        this.firstName = result.firstName;
        this.lastName = result.lastName;
        this.title = result.title;
        this.address = result.address;
        this.email = result.email;
        this.mobile = result.mobile;
        this.status = result.status;
        this.roles = result.roles.map((r) => new RoleDomain_1.RoleDomain(r));
        this.createdAt = result.createdAt;
        this.updatedAt = result.updatedAt;
    }
    static fromRegisterRequest(result) {
        return __awaiter(this, void 0, void 0, function* () {
            let self = new this();
            self.password = yield CryptoUtils_1.CryptoUtils.hashPassword(result.password);
            self.firstName = result.firstName;
            self.lastName = result.lastName;
            self.title = result.title;
            self.address = result.address;
            self.email = result.email;
            self.mobile = result.mobile;
            const roleService = typedi_1.default.get(RoleService_1.RoleService);
            const userRole = yield roleService.getByName("User");
            if (userRole)
                self.roles = [new RoleDomain_1.RoleDomain(userRole)];
            return self;
        });
    }
    static fromCreateRequest(result) {
        let self = new this();
        self.firstName = result.firstName;
        self.lastName = result.lastName;
        self.title = result.title;
        self.address = result.address;
        self.email = result.email;
        self.mobile = result.mobile;
        if (result.roles) {
            self.roles = result.roles.map((r) => {
                let role = new RoleDomain_1.RoleDomain();
                role.id = r.id;
                return role;
            });
        }
        return self;
    }
}
exports.UserDomain = UserDomain;
//# sourceMappingURL=UserDomain.js.map