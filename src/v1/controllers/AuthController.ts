import { Service } from "typedi";
import { UserService } from "../services/UserService";
import { NextFunction, Request, Response } from "express";
import { NoContentResponse } from "../../base/models/dto/response/success/NoContentResponse";
import { SignInResponse } from "../models/dto/response/auth/SignInResponse";
import { SuccessResponse } from "../../base/models/dto/response/success/SuccessResponse";
import { SignInRequest } from "../models/dto/request/auth/SignInRequest";
import { AuthService } from "../services/AuthService";
import { NotFoundException } from "../../base/exceptions/NotFoundException";
import { BadRequestException } from "../../base/exceptions/BadRequestException";
import { UserStatus } from "../enums/UserStatus";
import { CryptoUtils } from "../utils/auth/CryptoUtils";
import { SignUpRequest } from "../models/dto/request/auth/SignUpRequest";
import { ResetPasswordRequest } from "../models/dto/request/auth/ResetPasswordRequest";
import { JwtUtils } from "../utils/auth/JwtUtils";
import { ConfirmResetPasswordRequest } from "../models/dto/request/auth/ConfirmResetPasswordRequest";
import { RefreshTokenRequest } from "../models/dto/request/auth/RefreshTokenRequest";

@Service()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService
  ) {}

  public async signUp(req: Request, res: Response, next: NextFunction) {
    try {
      const rq = req.body;

      const user = await this.userService.create(rq);
      next(new SuccessResponse(user));
    } catch (e) {
      return next(e);
    }
  }

  public async signIn(req: Request, res: Response, next: NextFunction) {
    try {
      const rq: SignInRequest = req.body;

      const existingUser = await this.userService.getByEmail(rq.email);
      if (!existingUser) {
        throw new NotFoundException(`User ${rq.email} doesn't exist`);
      }

      if (existingUser.status !== UserStatus.ACTIVE) {
        throw new BadRequestException("User has not activated yet");
      }

      if (
        !(await CryptoUtils.comparePassword(existingUser.password, rq.password))
      ) {
        throw new BadRequestException("Password is not correct");
      }

      const response = await this.authService.generateAccessToken(existingUser);

      next(new SuccessResponse(response));
    } catch (e) {
      return next(e);
    }
  }

  public async refreshToken(req: Request, res: Response, next: NextFunction) {
    try {
      const rq: RefreshTokenRequest = req.body;
      let decoded: any;
      try {
        decoded = JwtUtils.verifyJwtToken(rq.token);
      } catch (error) {
        throw new BadRequestException("AccessToken is not in valid format");
      }
      const found_user = await this.userService.getById(decoded["id"]);
      if (!found_user) {
        throw new NotFoundException(`User not found`);
      }
      if (found_user.status !== UserStatus.ACTIVE) {
        throw new BadRequestException(`User is not activated`);
      }

      const response = this.authService.generateAccessToken(found_user);

      next(new SuccessResponse(response));
    } catch (e) {
      return next(e);
    }
  }

  public async resetPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const rq: ResetPasswordRequest = req.body;

      const existingUser = await this.userService.getByEmail(rq.email);
      if (!existingUser) {
        throw new NotFoundException(`User ${rq.email} doesn't exist`);
      }

      if (existingUser.status !== UserStatus.ACTIVE) {
        throw new BadRequestException("User has not activated yet");
      }

      const response = JwtUtils.createReset(existingUser);
      
      next(new NoContentResponse());
    } catch (e) {
      return next(e);
    }
  }

  public async confirmResetPassword(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const rq: ConfirmResetPasswordRequest = req.body;

      const existingUser = await this.userService.getByEmail(rq.email);
      if (!existingUser) {
        throw new NotFoundException(`User ${rq.email} doesn't exist`);
      }

      if (existingUser.status !== UserStatus.ACTIVE) {
        throw new BadRequestException("User has not activated yet");
      }

      const response = JwtUtils.createReset(existingUser);

      next(new NoContentResponse());
    } catch (e) {
      return next(e);
    }
  }

  public async changePassword(req: Request, res: Response, next: NextFunction) {
    try {
      next(new NoContentResponse());
    } catch (e) {
      return next(e);
    }
  }

  public async verifyEmail(req: Request, res: Response, next: NextFunction) {
    try {
      next(new NoContentResponse());
    } catch (e) {
      return next(e);
    }
  }
}
