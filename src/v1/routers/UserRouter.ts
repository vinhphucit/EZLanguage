import { CommonRoutesConfig } from "./CommonRouterConfig";
import express from "express";
import { UserController as UserController } from "../controllers/UserController";
import Container from "typedi";
import { AuthenticationMiddleware } from "../middlewares/AuthenticationMiddleware";
import { AuthorizationMiddleware } from "../middlewares/AuthorizationMiddleware";
import { Permissions } from "../utils/auth/Permissions";
import { ValidationMiddleware } from "../middlewares/ValidationMiddleware";
import { CreateUserRequest } from "../models/dto/request/user/CreateUserRequest";
import { UpdateUserByIdRequest } from "../models/dto/request/user/UpdateUserByIdRequest";

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
      ValidationMiddleware(CreateUserRequest),
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
      ValidationMiddleware(UpdateUserByIdRequest),
      controller.updateById.bind(controller)
    );
    this.router.delete(
      `/:id`,      
      AuthorizationMiddleware(Permissions.User.DeleteById),
      controller.deleteById.bind(controller)
    );
  }
}
