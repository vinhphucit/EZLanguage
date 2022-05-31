"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HealthCheckRouter = void 0;
const CommonRouterConfig_1 = require("./CommonRouterConfig");
const HealthCheckController_1 = require("../controllers/HealthCheckController");
class HealthCheckRouter extends CommonRouterConfig_1.CommonRoutesConfig {
    constructor(app) {
        super(app, "HealthCheckRouter", `health/check`);
    }
    configureRoutes() {
        const controller = new HealthCheckController_1.HealthCheckController();
        this.router.get(``, controller.get.bind(controller));
    }
}
exports.HealthCheckRouter = HealthCheckRouter;
//# sourceMappingURL=HealthCheckRouter.js.map