import { CommonRoutesConfig } from "./CommonRouterConfig";
import express from "express";
import { HealthCheckController } from "../controllers/HealthCheckController";
export class HealthCheckRouter extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, "HealthCheckRouter", `health/check`);
  }

  configureRoutes() {
    const controller = new HealthCheckController();
    this.router.get(``, controller.get.bind(controller));
  }
}
