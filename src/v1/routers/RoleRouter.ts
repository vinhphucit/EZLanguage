import { CommonRoutesConfig } from "./CommonRouterConfig";
import express from "express";
import Container from "typedi";
import { RoleController } from "../controllers/RoleController";
import { AuthenticationMiddleware } from "../middlewares/AuthenticationMiddleware";
import { AuthorizationMiddleware } from "../middlewares/AuthorizationMiddleware";
import { Permissions } from "../utils/auth/Permissions";

export class RoleRouter extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, "roles", `roles/`);
  }

  configureRoutes() {
    const controller = Container.get(RoleController);
    this.router.all(``, AuthenticationMiddleware());
    this.router.post(
      ``,
      AuthorizationMiddleware(Permissions.Role.Create),
      controller.create.bind(controller)
    );
    this.router.get(
      ``,
      AuthorizationMiddleware(Permissions.Role.Read),
      controller.get.bind(controller)
    );
    this.router.get(
      `/:id`,
      AuthorizationMiddleware(Permissions.Role.ReadById),
      controller.getById.bind(controller)
    );
    this.router.put(
      `/:id`,
      AuthorizationMiddleware(Permissions.Role.UpdateById),
      controller.updateById.bind(controller)
    );
    this.router.delete(
      `/:id`,
      AuthorizationMiddleware(Permissions.Role.DeleteById),
      controller.deleteById.bind(controller)
    );
  }
}
