import { Inject, Service } from "typedi";
import { IUser } from "../models/dao/User";
import { InternalServerException } from "../../base/exceptions/InternalServerException";
import { env } from "../../Env";
import { IRefreshToken } from "../models/dao/RefreshToken";
import { SignInResponse } from "../models/dto/response/auth/SignInResponse";
import { JwtUtils } from "../utils/auth/JwtUtils";
import { timeInSecondAfter } from "../utils/DateUtils";
import { RefreshTokenService } from "./RefreshTokenService";
import { RefreshTokenStatus } from "../enums/RefreshTokenStatus";
import { UserService } from "./UserService";
import { RefreshTokenRepository } from "../repositories/RefreshTokenRepository";

@Service()
export class AuthService {
  
  @Inject()
  refreshTokenService: RefreshTokenService;
  @Inject()
  userService: UserService;
  constructor(private readonly repo: RefreshTokenRepository ) {}

  public async generateAccessToken(
    user: IUser,
    previousRefreshToken?: string
  ): Promise<SignInResponse> {
    if (!user) throw new InternalServerException("User is not found");

    const expiryAccessToken = timeInSecondAfter(env.auth.accessTokenExpiresIn);
    const expiryRefreshToken = timeInSecondAfter(
      env.auth.refreshTokenExpiresIn
    );
    const newRefreshToken = await this.refreshTokenService.create(
      user.id,
      expiryRefreshToken
    );
    const refreshToken = JwtUtils.createRefreshToken(
      user,
      newRefreshToken.id,
      expiryRefreshToken
    );

    if (previousRefreshToken) {
      await this.refreshTokenService.updateRefreshTokenChain(
        newRefreshToken,
        previousRefreshToken
      );
    }

    let newAuth: SignInResponse = new SignInResponse();
    newAuth.accessToken = JwtUtils.createAccess(user, expiryAccessToken);
    newAuth.accessTokenExpiresAt = expiryAccessToken;
    newAuth.refreshToken = refreshToken;
    newAuth.refreshTokenExpiresAt = expiryRefreshToken;
    return newAuth;
  }

  async revokeRefreshToken(foundRefreshToken: IRefreshToken) {
    let tokenChain = foundRefreshToken.tokenChain;
    if(!tokenChain){
      tokenChain = [];
    }
    tokenChain.push(foundRefreshToken.id);
    await this.repo.updateStatusByIds(tokenChain, RefreshTokenStatus.BLOCK);
  }
}
