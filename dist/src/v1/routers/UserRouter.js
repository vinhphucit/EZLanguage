"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRouter = void 0;
const CommonRouterConfig_1 = require("./CommonRouterConfig");
const UserController_1 = require("../controllers/UserController");
const typedi_1 = __importDefault(require("typedi"));
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
        this.router.post(``, controller.create.bind(controller));
        this.router.get(``, controller.get.bind(controller));
        this.router.get(`:id`, controller.getById.bind(controller));
        this.router.put(`:id`, controller.updateById.bind(controller));
        this.router.delete(`:id`, controller.deleteById.bind(controller));
    }
}
exports.UserRouter = UserRouter;
//# sourceMappingURL=UserRouter.js.map