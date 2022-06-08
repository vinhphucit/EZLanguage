import { BadRequestException } from "../../base/exceptions/BadRequestException";
import { NotFoundException } from "../../base/exceptions/NotFoundException";
import { Inject, Service } from "typedi";
import { BaseList } from "../models/dao/BaseList";
import { IUser } from "../models/dao/User";
import { CreateUserRequest } from "../models/dto/request/user/CreateUserRequest";
import { UpdateUserByIdRequest } from "../models/dto/request/user/UpdateUserByIdRequest";
import { UserRepository } from "../repositories/UserRepository";
import { genRandomString, switchNull } from "../utils/StringUtils";
import { SignInRequest } from "../models/dto/request/auth/SignInRequest";
import { UserService } from "./UserService";
import { UserStatus } from "../enums/UserStatus";
import { CryptoUtils } from "../utils/auth/CryptoUtils";
import { InternalServerException } from "../../base/exceptions/InternalServerException";
import { env } from "../../Env";

import { UserDomain } from "../models/domain/UserDomain";
import { SignInResponse } from "../models/dto/response/auth/SignInResponse";
import { RefreshTokenRequest } from "../models/dto/request/auth/RefreshTokenRequest";
import { JwtUtils } from "../utils/auth/JwtUtils";

@Service()
export class AuthService {
  
  constructor(private readonly repo: UserRepository) {}

  public async generateAccessToken(found_user: IUser): Promise<SignInResponse> {
    if (!found_user) throw new InternalServerException("User is not found");

    let newAuth: SignInResponse = new SignInResponse();

    const timestamp_accesstoken_expiry =
      Math.floor(Date.now() / 1000) + env.auth.accessTokenExpiresIn * 60;
    newAuth.accessToken = JwtUtils.createAccess(
      found_user,
      timestamp_accesstoken_expiry
    );

    await JwtUtils.verifyJwtToken(newAuth.accessToken)

    newAuth.accessTokenExpiresAt = timestamp_accesstoken_expiry;
    //Create the refresh token
    const timestamp_refresh_expiry =
      Math.floor(Date.now() / 1000) + env.auth.refreshTokenExpiresIn * 60;
    newAuth.refreshToken = JwtUtils.createRefresh(
      found_user,
      timestamp_refresh_expiry
    );
    newAuth.refreshTokenExpiresAt = timestamp_refresh_expiry;
    return newAuth;
  }

  public async refreshToken(
    refreshRequest: RefreshTokenRequest
  ): Promise<SignInResponse> {
    let decoded: any;
    try {
      decoded = JwtUtils.verifyJwtToken(refreshRequest.token);
    } catch (error) {
      throw new BadRequestException("AccessToken is not in valid format");
    }
    const found_user = await this.repo.getById(decoded["id"]);
    if (!found_user) {
      throw new NotFoundException(`User not found`);
    }
    if (found_user.status !== UserStatus.ACTIVE) {
      throw new BadRequestException(`User is not activated`);
    }

    return this.generateAccessToken(found_user);
  }
}
