import { Service } from "typedi";
import { UserService } from "../services/UserService";
import { NextFunction, Request, Response } from "express";
import { NoContentResponse } from "../../base/models/dto/response/success/NoContentResponse";
import { SuccessResponse } from "../../base/models/dto/response/success/SuccessResponse";
import { SignInRequest } from "../models/dto/request/auth/SignInRequest";
import { AuthService } from "../services/AuthService";
import { NotFoundException } from "../../base/exceptions/NotFoundException";
import { BadRequestException } from "../../base/exceptions/BadRequestException";
import { UserStatus } from "../enums/UserStatus";
import { CryptoUtils } from "../utils/auth/CryptoUtils";
import { ResetPasswordRequest } from "../models/dto/request/auth/ResetPasswordRequest";
import { JwtUtils } from "../utils/auth/JwtUtils";
import { ConfirmResetPasswordRequest } from "../models/dto/request/auth/ConfirmResetPasswordRequest";
import { RefreshTokenRequest } from "../models/dto/request/auth/RefreshTokenRequest";
import { RefreshTokenService } from "../services/RefreshTokenService";
import { JwtRefreshToken } from "../models/domain/JwtRefreshToken";
import { RefreshTokenStatus } from "../enums/RefreshTokenStatus";
import { SignOutRequest } from "../models/dto/request/auth/SignOutRequest";
import { VerifyEmailRequest } from "../models/dto/request/auth/VerifyEmailRequest";
import { UserChoreService } from "../services/UserChoreService";
import { genRandomString } from "../utils/StringUtils";
import { ChangePasswordRequest } from "../models/dto/request/auth/ChangePasswordRequest";
import { getRequestUserId } from "../utils/RequestUtils";
import { SignUpRequest } from "../models/dto/request/auth/SignUpRequest";
import { UserDomain } from "../models/domain/UserDomain";

@Service()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly userChoreService: UserChoreService,
    private readonly refreshTokenService: RefreshTokenService
  ) {}

  public async signUp(req: Request, res: Response, next: NextFunction) {
    try {
      const rq: SignUpRequest = req.body;
      const user = await this.userService.create(
        await UserDomain.fromRegisterRequest(rq)
      );
      await this.userChoreService.updateEmailVerificationCodeByUserId(user);
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
      let token: JwtRefreshToken = await JwtUtils.verifyJwtToken(rq.token);

      const foundRefreshToken = await this.refreshTokenService.getById(
        token.refreshTokenId
      );

      if (
        !foundRefreshToken ||
        foundRefreshToken.status !== RefreshTokenStatus.ACTIVE
      ) {
        throw new BadRequestException("Invalid RefreshToken");
      }

      const foundUser = await this.userService.getById(token.userId);

      if (foundUser.status !== UserStatus.ACTIVE) {
        throw new BadRequestException(`User is not activated`);
      }

      const response = await this.authService.generateAccessToken(
        foundUser,
        token.refreshTokenId
      );

      next(new SuccessResponse(response));
    } catch (e) {
      return next(e);
    }
  }
  public async signOut(req: Request, res: Response, next: NextFunction) {
    try {
      const rq: SignOutRequest = req.body;
      let token: JwtRefreshToken = await JwtUtils.verifyJwtToken(rq.token);

      const foundRefreshToken = await this.refreshTokenService.getById(
        token.refreshTokenId
      );

      if (
        !foundRefreshToken ||
        foundRefreshToken.status !== RefreshTokenStatus.ACTIVE
      ) {
        throw new BadRequestException("Invalid RefreshToken");
      }

      await this.authService.revokeRefreshToken(foundRefreshToken);

      next(new NoContentResponse());
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

      const verificationCode = genRandomString(10);
      await this.userChoreService.updateResetPasswordCodeByUserId(
        existingUser.id,
        verificationCode
      );

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

      await this.userChoreService.verifyResetPasswordCodeById(
        existingUser.id,
        rq.token
      );
      await this.userService.updatePassword(existingUser, rq.password);

      next(new NoContentResponse());
    } catch (e) {
      return next(e);
    }
  }

  public async changePassword(req: Request, res: Response, next: NextFunction) {
    try {
      const rq: ChangePasswordRequest = req.body;
      const userId = getRequestUserId(req);
      const existingUser = await this.userService.getById(userId);

      if (existingUser.status !== UserStatus.ACTIVE) {
        throw new BadRequestException("User has not activated yet");
      }

      if (
        !(await CryptoUtils.comparePassword(
          existingUser.password,
          rq.oldPassword
        ))
      ) {
        throw new BadRequestException("Password is not correct");
      }

      this.userService.updatePassword(existingUser, rq.newPassword);

      next(new NoContentResponse());
    } catch (e) {
      return next(e);
    }
  }

  public async verifyEmail(req: Request, res: Response, next: NextFunction) {
    try {
      const rq: VerifyEmailRequest = req.body;

      const existingUser = await this.userService.getByEmail(rq.email);
      if (!existingUser) {
        throw new NotFoundException(`User ${rq.email} doesn't exist`);
      }

      if (existingUser.status === UserStatus.NOT_ACTIVE) {
        await this.userChoreService.verifyEmailVerificationCodeByUserId(
          existingUser.id,
          rq.code
        );
        await this.userService.updateStatusByUser(
          existingUser,
          UserStatus.ACTIVE
        );
      }

      next(new NoContentResponse());
    } catch (e) {
      return next(e);
    }
  }
}
