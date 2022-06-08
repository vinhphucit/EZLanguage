import { BadRequestException } from "../../base/exceptions/BadRequestException";
import { NotFoundException } from "../../base/exceptions/NotFoundException";
import { Service } from "typedi";
import { BaseList } from "../models/dao/BaseList";
import { IPermission } from "../models/dao/Permission";

import { CreatePermissionRequest } from "../models/dto/request/permission/CreatePermissionRequest";
import { UpdatePermissionRequest } from "../models/dto/request/permission/UpdatePermissionRequest";
import { PermissionRepository } from "../repositories/PermissionRepository";
import { switchNull } from "../utils/StringUtils";

@Service()
export class PermissionService {
  constructor(private readonly repo: PermissionRepository) {}

  public async create(
    permission: CreatePermissionRequest
  ): Promise<IPermission> {

    const foundPermission = await this.getByCode(permission.code);
    if (foundPermission) {
      throw new BadRequestException(`Permission code ${permission.code} already existed`);
    }

    let item: Partial<IPermission> = {
      name: permission.name,
      code: permission.code,
    };
    return this.repo.create(item);
  }

  async get(
    limit: string,
    start: string,
    sort: string,
    query: string
  ): Promise<BaseList<IPermission>> {
    return await this.repo.get(limit, start, sort, query);
  }

  async getById(id: string): Promise<IPermission> {
    const result = await this.repo.getById(id);
    if (!result) throw new NotFoundException(`User ${id} doesn't exist`);
    return result;
  }
  async getByCode(code: string): Promise<IPermission | undefined> {
    const result = await this.repo.get(`1`, `0`, undefined, `code%eq%${code}`);
    if (!result || result.totalItems == 0) return undefined;
    return result.items[0];
  }

  async getByCodes(codes: string[]): Promise<IPermission[] | undefined> {
    return await this.repo.getByCodes(codes);
  }

  async updateById(
    id: string,
    request: UpdatePermissionRequest
  ): Promise<IPermission | undefined> {
    const entity = await this.getById(id);
    if (request.code) {
      const entityByCode = await this.getByCode(request.code);

      if (entityByCode && entity.id !== entity.id) {
        throw new BadRequestException("code was existed in system");
      }
    }
    entity.name = switchNull(request.name, entity.name);
    entity.code = switchNull(request.code, entity.code);

    const updateEntity = await this.repo.updateById(id, entity);

    return updateEntity;
  }

  async deleteById(id: string): Promise<IPermission> {
    await this.getById(id);
    return this.repo.removeById(id);
  }
}
