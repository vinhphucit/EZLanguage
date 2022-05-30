import * as bodyParser from "body-parser";
import express, { Application } from "express";
import { Server } from "http";
import { CommonRoutesConfig } from "./v1/routers/CommonRouterConfig";
import { corsWhitelist } from "./v1/middlewares/CorsMiddleware";
import { env } from "./Env";
import { UserRouter } from "./v1/routers/UserRouter";
import { Logger } from "./base/utils/Logger";
import {banner} from "./base/utils/Banner";
import {ResFormaterMiddleware} from "./base/middlewares/ResFormaterMiddleware";
import {ReqFormaterMiddleware} from "./base/middlewares/ReqFormaterMiddleware";
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
    Logger.info(`Start Running Service`);
    this.server = this.app.listen(env.app.port, (): void => {
      this.routes.forEach((route: CommonRoutesConfig) => {
        Logger.info(`Routes configured for ${route.getName()}`);
      });
      banner(env.app.name);
    });
  }
  initializeEventDispatch() {
    Logger.info(`initializeEventDispatch`);
    // throw new Error("Method not implemented.");
  }
  initializeHandlingResponse() {
    Logger.info(`initializeHandlingResponse`);
    this.app.use(new ResFormaterMiddleware().handleResponse);
  }
  initializeRouters() {
    Logger.info(`initializeRouters`);
    this.routes.push(new UserRouter(this.app));
  }
  initializeHandlingRequest() {
    Logger.info(`initializeHandlingRequest`);
    this.app.use(new ReqFormaterMiddleware().handleRequest);
  }
  initializeMiddlewares() {
    Logger.info(`initializeMiddlewares`);
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(corsWhitelist(env.cors.whitelist));
  }
}
