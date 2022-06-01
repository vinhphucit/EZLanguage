import { CommonRoutesConfig } from "./CommonRouterConfig";
import express from "express";
import { UserController as UserController } from "../controllers/UserController";
import Container from "typedi";

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
    this.router.post(``, controller.create.bind(controller));
    this.router.get(``, controller.get.bind(controller));    
    this.router.get(`:id`, controller.getById.bind(controller));    
    this.router.put(`:id`, controller.updateById.bind(controller));    
    this.router.delete(`:id`, controller.deleteById.bind(controller));    
  }
}
