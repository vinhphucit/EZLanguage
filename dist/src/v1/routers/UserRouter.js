"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRouter = void 0;
const CommonRouterConfig_1 = require("../../base/routers/CommonRouterConfig");
class UserRouter extends CommonRouterConfig_1.CommonRoutesConfig {
    constructor(app) {
        super(app, "users", `users/`);
    }
    configureRoutes() {
        this.router.get(``, (req, res) => {
            res.status(200).send(`List of users`);
        });
        this.router.all(``, (req, res, next) => {
            // this middleware function runs before any request to /users/:userId
            // but it doesn't accomplish anything just yet---
            // it simply passes control to the next applicable function below using next()
            next();
        });
        this.router.get(``, (req, res) => {
            res.status(200).send(`GET requested for id ${req.params.userId}`);
        });
        this.router.put(``, (req, res) => {
            res.status(200).send(`PUT requested for id ${req.params.userId}`);
        });
        this.router.patch(``, (req, res) => {
            res.status(200).send(`PATCH requested for id ${req.params.userId}`);
        });
        this.router.delete(``, (req, res) => {
            res.status(200).send(`DELETE requested for id ${req.params.userId}`);
        });
    }
}
exports.UserRouter = UserRouter;
//# sourceMappingURL=UserRouter.js.map