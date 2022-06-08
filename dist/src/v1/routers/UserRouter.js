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
class UserRouter extends CommonRouterConfig_1.CommonRoutesConfig {
    constructor(app) {
        super(app, "users", `users/`);
    }
    configureRoutes() {
        const controller = typedi_1.default.get(UserController_1.UserController);
        this.router.all(``, (req, res, next) => {
            // this middleware function runs before any request to /users/:userId
            // but it doesn't accomplish anything just yet---
            // it simply passes control to the next applicable function below using next()
            next();
        });
        this.router.post(``, (0, AuthenticationMiddleware_1.AuthenticationMiddleware)(), (0, AuthorizationMiddleware_1.AuthorizationMiddleware)(Permissions_1.Permissions.User.Create), controller.create.bind(controller));
        this.router.get(``, (0, AuthenticationMiddleware_1.AuthenticationMiddleware)(), (0, AuthorizationMiddleware_1.AuthorizationMiddleware)(Permissions_1.Permissions.User.Read), controller.get.bind(controller));
        this.router.get(`/:id`, (0, AuthenticationMiddleware_1.AuthenticationMiddleware)(), (0, AuthorizationMiddleware_1.AuthorizationMiddleware)(Permissions_1.Permissions.User.ReadById), controller.getById.bind(controller));
        this.router.put(`/:id`, (0, AuthenticationMiddleware_1.AuthenticationMiddleware)(), (0, AuthorizationMiddleware_1.AuthorizationMiddleware)(Permissions_1.Permissions.User.UpdateById), controller.updateById.bind(controller));
        this.router.delete(`/:id`, (0, AuthenticationMiddleware_1.AuthenticationMiddleware)(), (0, AuthorizationMiddleware_1.AuthorizationMiddleware)(Permissions_1.Permissions.User.DeleteById), controller.deleteById.bind(controller));
    }
}
exports.UserRouter = UserRouter;
//# sourceMappingURL=UserRouter.js.map