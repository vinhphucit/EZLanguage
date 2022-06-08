import { CommonRoutesConfig } from "./CommonRouterConfig";
import express from "express";
import { UserController as UserController } from "../controllers/UserController";
import Container from "typedi";
import { AuthenticationMiddleware } from "../middlewares/AuthenticationMiddleware";
import { AuthorizationMiddleware } from "../middlewares/AuthorizationMiddleware";
import { Permissions } from "../utils/auth/Permissions";

export class UserRouter extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, "users", `users/`);
  }

  configureRoutes() {
    const controller = Container.get(UserController);

    this.router.all(``, AuthenticationMiddleware());
    this.router.post(
      ``,
      AuthorizationMiddleware(Permissions.User.Create),
      controller.create.bind(controller)
    );
    this.router.get(
      ``,      
      AuthorizationMiddleware(Permissions.User.Read),
      controller.get.bind(controller)
    );
    this.router.get(
      `/:id`,      
      AuthorizationMiddleware(Permissions.User.ReadById),
      controller.getById.bind(controller)
    );
    this.router.put(
      `/:id`,    
      AuthorizationMiddleware(Permissions.User.UpdateById),
      controller.updateById.bind(controller)
    );
    this.router.delete(
      `/:id`,      
      AuthorizationMiddleware(Permissions.User.DeleteById),
      controller.deleteById.bind(controller)
    );
  }
}
