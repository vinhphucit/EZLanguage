import { CommonRoutesConfig } from "./CommonRouterConfig";
import express from "express";

import Container from "typedi";
import { AuthController } from "../controllers/AuthController";
import { ValidationMiddleware } from "../middlewares/ValidationMiddleware";
import { SignUpRequest } from "../models/dto/request/auth/SignUpRequest";
import { SignInRequest } from "../models/dto/request/auth/SignInRequest";
import { ResetPasswordRequest } from "../models/dto/request/auth/ResetPasswordRequest";
import { ConfirmResetPasswordRequest } from "../models/dto/request/auth/ConfirmResetPasswordRequest";
import { VerifyEmailRequest } from "../models/dto/request/auth/VerifyEmailRequest";
import { ChangePasswordRequest } from "../models/dto/request/auth/ChangePasswordRequest";
import { RefreshTokenRequest } from "../models/dto/request/auth/RefreshTokenRequest";
import { SignOutRequest } from "../models/dto/request/auth/SignOutRequest";

export class AuthRouter extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, "auth", `auth/`);
  }

  configureRoutes() {
    const controller = Container.get(AuthController);

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
    this.router.post(
      `/signUp`,
      ValidationMiddleware(SignUpRequest),
      controller.signUp.bind(controller)
    );
    this.router.post(
      `/signIn`,
      ValidationMiddleware(SignInRequest),
      controller.signIn.bind(controller)
    );
    this.router.post(
      `/signOut`,
      ValidationMiddleware(SignOutRequest),
      controller.signOut.bind(controller)
    );
    this.router.post(
      `/resetPassword`,
      ValidationMiddleware(ResetPasswordRequest),
      controller.resetPassword.bind(controller)
    );
    this.router.post(
      `/confirmResetPassword`,
      ValidationMiddleware(ConfirmResetPasswordRequest),
      controller.confirmResetPassword.bind(controller)
    );
    this.router.post(
      `/changePassword`,
      ValidationMiddleware(ChangePasswordRequest),
      controller.changePassword.bind(controller)
    );
    this.router.post(
      `/verifyEmail`,
      ValidationMiddleware(VerifyEmailRequest),
      controller.verifyEmail.bind(controller)
    );
    this.router.post(
      `/refreshToken`,
      ValidationMiddleware(RefreshTokenRequest),
      controller.refreshToken.bind(controller)
    );
  }
}
