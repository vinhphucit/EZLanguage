"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRouter = void 0;
const CommonRouterConfig_1 = require("./CommonRouterConfig");
const typedi_1 = __importDefault(require("typedi"));
const AuthController_1 = require("../controllers/AuthController");
const ValidationMiddleware_1 = require("../middlewares/ValidationMiddleware");
const SignUpRequest_1 = require("../models/dto/request/auth/SignUpRequest");
const SignInRequest_1 = require("../models/dto/request/auth/SignInRequest");
const ResetPasswordRequest_1 = require("../models/dto/request/auth/ResetPasswordRequest");
const ConfirmResetPasswordRequest_1 = require("../models/dto/request/auth/ConfirmResetPasswordRequest");
const VerifyEmailRequest_1 = require("../models/dto/request/auth/VerifyEmailRequest");
const ChangePasswordRequest_1 = require("../models/dto/request/auth/ChangePasswordRequest");
const RefreshTokenRequest_1 = require("../models/dto/request/auth/RefreshTokenRequest");
const SignOutRequest_1 = require("../models/dto/request/auth/SignOutRequest");
class AuthRouter extends CommonRouterConfig_1.CommonRoutesConfig {
    constructor(app) {
        super(app, "auth", `auth/`);
    }
    configureRoutes() {
        const controller = typedi_1.default.get(AuthController_1.AuthController);
        this.router.all(``, (req, res, next) => {
            // this middleware function runs before any request to /users/:userId
            // but it doesn't accomplish anything just yet---
            // it simply passes control to the next applicable function below using next()
            next();
        });
        this.router.post(`/signUp`, (0, ValidationMiddleware_1.ValidationMiddleware)(SignUpRequest_1.SignUpRequest), controller.signUp.bind(controller));
        this.router.post(`/signIn`, (0, ValidationMiddleware_1.ValidationMiddleware)(SignInRequest_1.SignInRequest), controller.signIn.bind(controller));
        this.router.post(`/signOut`, (0, ValidationMiddleware_1.ValidationMiddleware)(SignOutRequest_1.SignOutRequest), controller.signOut.bind(controller));
        this.router.post(`/resetPassword`, (0, ValidationMiddleware_1.ValidationMiddleware)(ResetPasswordRequest_1.ResetPasswordRequest), controller.resetPassword.bind(controller));
        this.router.post(`/confirmResetPassword`, (0, ValidationMiddleware_1.ValidationMiddleware)(ConfirmResetPasswordRequest_1.ConfirmResetPasswordRequest), controller.confirmResetPassword.bind(controller));
        this.router.post(`/changePassword`, (0, ValidationMiddleware_1.ValidationMiddleware)(ChangePasswordRequest_1.ChangePasswordRequest), controller.changePassword.bind(controller));
        this.router.post(`/verifyEmail`, (0, ValidationMiddleware_1.ValidationMiddleware)(VerifyEmailRequest_1.VerifyEmailRequest), controller.verifyEmail.bind(controller));
        this.router.post(`/refreshToken`, (0, ValidationMiddleware_1.ValidationMiddleware)(RefreshTokenRequest_1.RefreshTokenRequest), controller.refreshToken.bind(controller));
    }
}
exports.AuthRouter = AuthRouter;
//# sourceMappingURL=AuthRouter.js.map