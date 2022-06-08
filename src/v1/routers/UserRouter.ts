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

    this.router.all(
      ``,
      (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
      ) => {
        // this middleware function runs before any request to /users/:userId
        // but it doesn't accomplish anything just yet---
        // it simply passes control to the next applicable function below using next()
        next();
      }
    );
    this.router.post(``,AuthenticationMiddleware(), AuthorizationMiddleware(Permissions.User.Create), controller.create.bind(controller));
    this.router.get(``, AuthenticationMiddleware(), AuthorizationMiddleware(Permissions.User.Read),controller.get.bind(controller));    
    this.router.get(`/:id`, AuthenticationMiddleware(), AuthorizationMiddleware(Permissions.User.ReadById),controller.getById.bind(controller));    
    this.router.put(`/:id`, AuthenticationMiddleware(), AuthorizationMiddleware(Permissions.User.UpdateById), controller.updateById.bind(controller));    
    this.router.delete(`/:id`,  AuthenticationMiddleware(), AuthorizationMiddleware(Permissions.User.DeleteById), controller.deleteById.bind(controller));    
  }
}
