"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFountRounter = void 0;
const CommonRouterConfig_1 = require("./CommonRouterConfig");
const NotFoundController_1 = require("../controllers/NotFoundController");
class NotFountRounter extends CommonRouterConfig_1.CommonRoutesConfig {
    constructor(app) {
        super(app, `NotFountRounter`, ``);
    }
    configureRoutes() {
        const controller = new NotFoundController_1.NotFoundController();
        this.router.all(`*`, controller.handleNotFoundUrl.bind(controller));
    }
}
exports.NotFountRounter = NotFountRounter;
//# sourceMappingURL=NotFountRouter.js.map