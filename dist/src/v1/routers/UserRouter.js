"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRouter = void 0;
const CommonRouterConfig_1 = require("./CommonRouterConfig");
const UserController_1 = require("../controllers/UserController");
const typedi_1 = __importDefault(require("typedi"));
const AuthenticationMiddleware_1 = require("../middlewares/AuthenticationMiddleware");
const AuthorizationMiddleware_1 = require("../middlewares/AuthorizationMiddleware");
const Permissions_1 = require("../utils/auth/Permissions");
const ValidationMiddleware_1 = require("../middlewares/ValidationMiddleware");
const CreateUserRequest_1 = require("../models/dto/request/user/CreateUserRequest");
const UpdateUserByIdRequest_1 = require("../models/dto/request/user/UpdateUserByIdRequest");
class UserRouter extends CommonRouterConfig_1.CommonRoutesConfig {
    constructor(app) {
        super(app, "users", `users/`);
    }
    configureRoutes() {
        const controller = typedi_1.default.get(UserController_1.UserController);
        this.router.post(``, (0, AuthenticationMiddleware_1.AuthenticationMiddleware)(), (0, AuthorizationMiddleware_1.AuthorizationMiddleware)(Permissions_1.Permissions.User.Create), (0, ValidationMiddleware_1.ValidationMiddleware)(CreateUserRequest_1.CreateUserRequest), controller.create.bind(controller));
        this.router.get(``, (0, AuthenticationMiddleware_1.AuthenticationMiddleware)(), (0, AuthorizationMiddleware_1.AuthorizationMiddleware)(Permissions_1.Permissions.User.Read), controller.get.bind(controller));
        this.router.get(`/:id`, (0, AuthenticationMiddleware_1.AuthenticationMiddleware)(), (0, AuthorizationMiddleware_1.AuthorizationMiddleware)(Permissions_1.Permissions.User.ReadById), controller.getById.bind(controller));
        this.router.put(`/:id`, (0, AuthenticationMiddleware_1.AuthenticationMiddleware)(), (0, AuthorizationMiddleware_1.AuthorizationMiddleware)(Permissions_1.Permissions.User.UpdateById), (0, ValidationMiddleware_1.ValidationMiddleware)(UpdateUserByIdRequest_1.UpdateUserByIdRequest), controller.updateById.bind(controller));
        this.router.delete(`/:id`, (0, AuthenticationMiddleware_1.AuthenticationMiddleware)(), (0, AuthorizationMiddleware_1.AuthorizationMiddleware)(Permissions_1.Permissions.User.DeleteById), controller.deleteById.bind(controller));
    }
}
exports.UserRouter = UserRouter;
//# sourceMappingURL=UserRouter.js.map