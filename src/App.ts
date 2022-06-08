import "reflect-metadata";

import * as bodyParser from "body-parser";
import express, { Application } from "express";
import { Server } from "http";
import { CommonRoutesConfig } from "./v1/routers/CommonRouterConfig";
import { corsWhitelist } from "./v1/middlewares/CorsMiddleware";
import { env } from "./Env";
import { UserRouter } from "./v1/routers/UserRouter";
import { Logger } from "./base/utils/Logger";
import { banner } from "./base/utils/Banner";
import { ResFormaterMiddleware } from "./base/middlewares/ResFormaterMiddleware";
import { ReqFormaterMiddleware } from "./base/middlewares/ReqFormaterMiddleware";
import { SwaggerRouter } from "./v1/routers/SwaggerRouter";
import { HealthCheckRouter } from "./v1/routers/HealthCheckRouter";
import { NotFoundRouter } from "./v1/routers/NotFoundRouter";
import { RoleRouter } from "./v1/routers/RoleRouter";
import { PermissionRouter } from "./v1/routers/PermissionRouter";
import { AuthRouter } from "./v1/routers/AuthRouter";

export class App {
  public app: Application = express();
  public server: Server;
  routes: Array<CommonRoutesConfig> = [];
  // const debugLog: debug.IDebugger = debug('app');

  constructor() {
    this.initializeMiddlewares();
    this.initializeHandlingRequest();
    this.initializeRouters();
    this.initializeHandlingResponse();
    this.initializeEventDispatch();
    this.startServerListening();
  }
  startServerListening() {
    this.server = this.app.listen(env.app.port, (): void => {
      this.routes.forEach((route: CommonRoutesConfig) => {
        Logger.info(`Routes configured for ${route.getName()}`);
      });
      banner(env.app.name);
    });
  }
  initializeEventDispatch() {
    // throw new Error("Method not implemented.");
  }
  initializeHandlingResponse() {
    this.app.use(new ResFormaterMiddleware().handleResponse);
  }
  initializeRouters() {
    this.routes.push(
      new SwaggerRouter(this.app),
      new HealthCheckRouter(this.app),
      new AuthRouter(this.app),
      new UserRouter(this.app),
      new RoleRouter(this.app),
      new PermissionRouter(this.app),      
      new NotFoundRouter(this.app)
    );
  }
  initializeHandlingRequest() {
    this.app.use(new ReqFormaterMiddleware().handleRequest);
  }
  initializeMiddlewares() {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(corsWhitelist(env.cors.whitelist));
  }
}
