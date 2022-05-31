"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommonRoutesConfig = void 0;
const express_1 = require("express");
const Env_1 = require("../../Env");
class CommonRoutesConfig {
    constructor(app, name, path = null) {
        this.router = (0, express_1.Router)();
        this.app = app;
        this.name = name;
        if (path == null) {
            path = name;
        }
        this.configureRoutes();
        // this.app.use(`${VERSION}/${env.app.rootPath}/${name}/`, this.router);
        this.app.use(`/${Env_1.env.app.rootPath}/${path}`, this.router);
    }
    getName() {
        return this.name;
    }
}
exports.CommonRoutesConfig = CommonRoutesConfig;
//# sourceMappingURL=CommonRouterConfig.js.map