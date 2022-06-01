"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleRouter = void 0;
const CommonRouterConfig_1 = require("./CommonRouterConfig");
const typedi_1 = __importDefault(require("typedi"));
const RoleController_1 = require("../controllers/RoleController");
class RoleRouter extends CommonRouterConfig_1.CommonRoutesConfig {
    constructor(app) {
        super(app, "roles", `roles/`);
    }
    configureRoutes() {
        const controller = typedi_1.default.get(RoleController_1.RoleController);
        this.router.post(``, controller.create.bind(controller));
        this.router.get(``, controller.get.bind(controller));
        this.router.get(`:id`, controller.getById.bind(controller));
        this.router.put(`:id`, controller.updateById.bind(controller));
        this.router.delete(`:id`, controller.deleteById.bind(controller));
    }
}
exports.RoleRouter = RoleRouter;
//# sourceMappingURL=RoleRouter.js.map