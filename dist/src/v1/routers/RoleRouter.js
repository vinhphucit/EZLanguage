"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleRouter = void 0;
const CommonRouterConfig_1 = require("./CommonRouterConfig");
const typedi_1 = __importDefault(require("typedi"));
const RoleController_1 = require("../controllers/RoleController");
const AuthenticationMiddleware_1 = require("../middlewares/AuthenticationMiddleware");
const AuthorizationMiddleware_1 = require("../middlewares/AuthorizationMiddleware");
const Permissions_1 = require("../utils/auth/Permissions");
class RoleRouter extends CommonRouterConfig_1.CommonRoutesConfig {
    constructor(app) {
        super(app, "roles", `roles/`);
    }
    configureRoutes() {
        const controller = typedi_1.default.get(RoleController_1.RoleController);
        this.router.all(``, (0, AuthenticationMiddleware_1.AuthenticationMiddleware)());
        this.router.post(``, (0, AuthorizationMiddleware_1.AuthorizationMiddleware)(Permissions_1.Permissions.Role.Create), controller.create.bind(controller));
        this.router.get(``, (0, AuthorizationMiddleware_1.AuthorizationMiddleware)(Permissions_1.Permissions.Role.Read), controller.get.bind(controller));
        this.router.get(`/:id`, (0, AuthorizationMiddleware_1.AuthorizationMiddleware)(Permissions_1.Permissions.Role.ReadById), controller.getById.bind(controller));
        this.router.put(`/:id`, (0, AuthorizationMiddleware_1.AuthorizationMiddleware)(Permissions_1.Permissions.Role.UpdateById), controller.updateById.bind(controller));
        this.router.delete(`/:id`, (0, AuthorizationMiddleware_1.AuthorizationMiddleware)(Permissions_1.Permissions.Role.DeleteById), controller.deleteById.bind(controller));
    }
}
exports.RoleRouter = RoleRouter;
//# sourceMappingURL=RoleRouter.js.map