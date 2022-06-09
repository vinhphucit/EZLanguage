import { BadRequestException } from "../../base/exceptions/BadRequestException";
import { NotFoundException } from "../../base/exceptions/NotFoundException";
import { Inject, Service } from "typedi";
import { BaseList } from "../models/dao/BaseList";
import { IRole } from "../models/dao/Role";

import { CreateRoleRequest } from "../models/dto/request/role/CreateRoleRequest";
import { UpdateRoleRequest } from "../models/dto/request/role/UpdateRoleRequest";
import { RoleRepository } from "../repositories/RoleRepository";
import { switchNull } from "../utils/StringUtils";
import { IRefreshToken } from "../models/dao/RefreshToken";
import { RefreshTokenRepository } from "../repositories/RefreshTokenRepository";

@Service()
export class RefreshTokenService {
  constructor(private readonly repo: RefreshTokenRepository) {}

  public async create(
    userId: string,
    expiresAt: number
  ): Promise<IRefreshToken> {
    let item: Partial<IRefreshToken> = {
      userId,
      expiresAt,
    };
    return this.repo.create(item);
  }

  async getById(id: string): Promise<IRefreshToken> {
    const result = await this.repo.getById(id);
    if (!result)
      throw new NotFoundException(`RefreshToken ${id} doesn't exist`);
    return result;
  }

  async updateRefreshTokenChain(
    current: IRefreshToken,
    previous: string
  ): Promise<IRefreshToken> {
    const foundToken = await this.getById(previous);
    let foundTokenChain = foundToken.tokenChain;
    if (!foundTokenChain) {
      foundTokenChain = [];
    }

    foundTokenChain.push(foundToken.id);
    current.tokenChain = foundTokenChain;
    return this.repo.updateById(current.id, current);
  }
}
