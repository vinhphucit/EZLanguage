"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const bodyParser = __importStar(require("body-parser"));
const express_1 = __importDefault(require("express"));
const CorsMiddleware_1 = require("./v1/middlewares/CorsMiddleware");
const Env_1 = require("./Env");
const UserRouter_1 = require("./v1/routers/UserRouter");
const Logger_1 = require("./base/utils/Logger");
const Banner_1 = require("./base/utils/Banner");
const ResFormaterMiddleware_1 = require("./base/middlewares/ResFormaterMiddleware");
const ReqFormaterMiddleware_1 = require("./base/middlewares/ReqFormaterMiddleware");
const SwaggerRouter_1 = require("./base/routers/SwaggerRouter");
const HealthCheckRouter_1 = require("./base/routers/HealthCheckRouter");
const NotFountRouter_1 = require("./base/routers/NotFountRouter");
class App {
    // const debugLog: debug.IDebugger = debug('app');
    constructor() {
        this.app = (0, express_1.default)();
        this.routes = [];
        this.initializeMiddlewares();
        this.initializeHandlingRequest();
        this.initializeRouters();
        this.initializeHandlingResponse();
        this.initializeEventDispatch();
        this.startServerListening();
    }
    startServerListening() {
        Logger_1.Logger.info(`Start Running Service`);
        this.server = this.app.listen(Env_1.env.app.port, () => {
            this.routes.forEach((route) => {
                Logger_1.Logger.info(`Routes configured for ${route.getName()}`);
            });
            Logger_1.Logger.info(this.app._router.stack);
            (0, Banner_1.banner)(Env_1.env.app.name);
        });
    }
    initializeEventDispatch() {
        Logger_1.Logger.info(`initializeEventDispatch`);
        // throw new Error("Method not implemented.");
    }
    initializeHandlingResponse() {
        Logger_1.Logger.info(`initializeHandlingResponse`);
        this.app.use(new ResFormaterMiddleware_1.ResFormaterMiddleware().handleResponse);
    }
    initializeRouters() {
        Logger_1.Logger.info(`initializeRouters`);
        this.routes.push(new SwaggerRouter_1.SwaggerRouter(this.app), new HealthCheckRouter_1.HealthCheckRouter(this.app), new UserRouter_1.UserRouter(this.app), new NotFountRouter_1.NotFountRounter(this.app));
    }
    initializeHandlingRequest() {
        Logger_1.Logger.info(`initializeHandlingRequest`);
        this.app.use(new ReqFormaterMiddleware_1.ReqFormaterMiddleware().handleRequest);
    }
    initializeMiddlewares() {
        Logger_1.Logger.info(`initializeMiddlewares`);
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use((0, CorsMiddleware_1.corsWhitelist)(Env_1.env.cors.whitelist));
    }
}
exports.App = App;
//# sourceMappingURL=App.js.map