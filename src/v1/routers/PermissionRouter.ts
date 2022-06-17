import { CommonRoutesConfig } from "./CommonRouterConfig";
import express from "express";
import Container from "typedi";
import { RoleController } from "../controllers/RoleController";
import { PermissionController } from "../controllers/PermissionController";
import { AuthorizationMiddleware } from "../middlewares/AuthorizationMiddleware";
import { Permissions } from "../utils/auth/Permissions";
import { AuthenticationMiddleware } from "../middlewares/AuthenticationMiddleware";

export class PermissionRouter extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, "permissions", `permissions/`);
  }

  configureRoutes() {
    const controller = Container.get(PermissionController);

    this.router.post(
      ``,
      AuthenticationMiddleware(),
      AuthorizationMiddleware(Permissions.Permission.Create),
      controller.create.bind(controller)
    );
    this.router.get(
      ``,
      AuthenticationMiddleware(),
      AuthorizationMiddleware(Permissions.Permission.Read),
      controller.get.bind(controller)
    );
    this.router.get(
      `/:id`,
      AuthenticationMiddleware(),
      AuthorizationMiddleware(Permissions.Permission.ReadById),
      controller.getById.bind(controller)
    );
    this.router.put(
      `/:id`,
      AuthenticationMiddleware(),
      AuthorizationMiddleware(Permissions.Permission.UpdateById),
      controller.updateById.bind(controller)
    );
    this.router.delete(
      `/:id`,
      AuthenticationMiddleware(),
      AuthorizationMiddleware(Permissions.Permission.DeleteById),
      controller.deleteById.bind(controller)
    );
  }
}
