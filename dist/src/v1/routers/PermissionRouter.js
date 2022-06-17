"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionRouter = void 0;
const CommonRouterConfig_1 = require("./CommonRouterConfig");
const typedi_1 = __importDefault(require("typedi"));
const PermissionController_1 = require("../controllers/PermissionController");
const AuthorizationMiddleware_1 = require("../middlewares/AuthorizationMiddleware");
const Permissions_1 = require("../utils/auth/Permissions");
const AuthenticationMiddleware_1 = require("../middlewares/AuthenticationMiddleware");
class PermissionRouter extends CommonRouterConfig_1.CommonRoutesConfig {
    constructor(app) {
        super(app, "permissions", `permissions/`);
    }
    configureRoutes() {
        const controller = typedi_1.default.get(PermissionController_1.PermissionController);
        this.router.post(``, (0, AuthenticationMiddleware_1.AuthenticationMiddleware)(), (0, AuthorizationMiddleware_1.AuthorizationMiddleware)(Permissions_1.Permissions.Permission.Create), controller.create.bind(controller));
        this.router.get(``, (0, AuthenticationMiddleware_1.AuthenticationMiddleware)(), (0, AuthorizationMiddleware_1.AuthorizationMiddleware)(Permissions_1.Permissions.Permission.Read), controller.get.bind(controller));
        this.router.get(`/:id`, (0, AuthenticationMiddleware_1.AuthenticationMiddleware)(), (0, AuthorizationMiddleware_1.AuthorizationMiddleware)(Permissions_1.Permissions.Permission.ReadById), controller.getById.bind(controller));
        this.router.put(`/:id`, (0, AuthenticationMiddleware_1.AuthenticationMiddleware)(), (0, AuthorizationMiddleware_1.AuthorizationMiddleware)(Permissions_1.Permissions.Permission.UpdateById), controller.updateById.bind(controller));
        this.router.delete(`/:id`, (0, AuthenticationMiddleware_1.AuthenticationMiddleware)(), (0, AuthorizationMiddleware_1.AuthorizationMiddleware)(Permissions_1.Permissions.Permission.DeleteById), controller.deleteById.bind(controller));
    }
}
exports.PermissionRouter = PermissionRouter;
//# sourceMappingURL=PermissionRouter.js.map