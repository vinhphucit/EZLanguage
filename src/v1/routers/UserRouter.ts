import { CommonRoutesConfig } from "../../base/routers/CommonRouterConfig";
import express from "express";

export class UserRouter extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, "users", `users/`);
  }

  configureRoutes() {
    this.router.get(``, (req: express.Request, res: express.Response) => {
      res.status(200).send(`List of users`);
    });

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
    this.router.get(``, (req: express.Request, res: express.Response) => {
      res.status(200).send(`GET requested for id ${req.params.userId}`);
    });
    this.router.put(``, (req: express.Request, res: express.Response) => {
      res.status(200).send(`PUT requested for id ${req.params.userId}`);
    });
    this.router.patch(``, (req: express.Request, res: express.Response) => {
      res.status(200).send(`PATCH requested for id ${req.params.userId}`);
    });
    this.router.delete(``, (req: express.Request, res: express.Response) => {
      res.status(200).send(`DELETE requested for id ${req.params.userId}`);
    });
  }
}
