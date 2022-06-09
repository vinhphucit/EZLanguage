import { BadRequestException } from "../../base/exceptions/BadRequestException";
import { NotFoundException } from "../../base/exceptions/NotFoundException";
import { Inject, Service } from "typedi";
import { BaseList } from "../models/dao/BaseList";
import { IUser } from "../models/dao/User";
import { CreateUserRequest } from "../models/dto/request/user/CreateUserRequest";
import { UpdateUserByIdRequest } from "../models/dto/request/user/UpdateUserByIdRequest";
import { UserRepository } from "../repositories/UserRepository";
import { genRandomString, switchNull } from "../utils/StringUtils";
import { CryptoUtils } from "../utils/auth/CryptoUtils";
import { RoleRepository } from "../repositories/RoleRepository";
import { RoleService } from "./RoleService";
import { UserStatus } from "../enums/UserStatus";

@Service()
export class UserService {
  @Inject()
  roleService: RoleService;

  constructor(private readonly repo: UserRepository) {}

  public async create(user: CreateUserRequest): Promise<IUser> {
    const existingUser = await this.getByEmail(user.email);
    if (existingUser) {      
        throw new BadRequestException(`Email ${user.email} already existed`);      
    } else {
      return await this._createNewUser(user);
    }
  }

  async get(
    limit: string,
    start: string,
    sort: string,
    query: string
  ): Promise<BaseList<IUser>> {
    return await this.repo.get(limit, start, sort, query);
  }

  async getById(id: string): Promise<IUser> {
    const result = await this.repo.getById(id);
    if (!result) throw new NotFoundException(`User ${id} doesn't exist`);
    return result;
  }

  async getByEmail(email: string): Promise<IUser | undefined> {
    const result = await this.repo.get(
      `1`,
      `0`,
      undefined,
      `email%eq%${email}`
    );
    if (!result || result.totalItems == 0) return undefined;
    return result.items[0];
  }
  async update(user: IUser): Promise<IUser | undefined> {
    return await user.save();
  }

  async updatePassword(
    user: IUser,
    password: string
  ): Promise<IUser | undefined> {
    user.password = await CryptoUtils.hashPassword(password);
    return user.save();
  }

  async updateById(
    id: string,
    request: UpdateUserByIdRequest
  ): Promise<IUser | undefined> {
    const entity = await this.getById(id);

    entity.firstName = switchNull(request.firstName, entity.firstName);
    entity.lastName = switchNull(request.lastName, entity.lastName);
    entity.address = switchNull(request.address, entity.address);
    entity.mobile = switchNull(request.mobile, entity.mobile);
    entity.title = switchNull(request.title, entity.title);

    if (request.roles) {
      const roles = await this.roleService.getByIds(
        request.roles.map((r) => r.id)
      );
      entity.roles = roles;
    }

    const updateEntity = await this.repo.updateById(id, entity);

    return updateEntity;
  }

  async updateStatusByUser(
    user: IUser,
    status: string
  ): Promise<IUser | undefined> {
    user.status = status;
    return await user.save();
  }

  async deleteById(id: string): Promise<IUser> {
    await this.getById(id);
    return this.repo.removeById(id);
  }

  private async _createNewUser(user: CreateUserRequest): Promise<IUser> {
    let item: Partial<IUser> = {
      firstName: user.firstName,
      lastName: user.lastName,
      password: await CryptoUtils.hashPassword(user.password),
      title: user.title,
      address: user.address,
      email: user.email,
      mobile: user.mobile,
    };

    if (user.roles) {
      const roles = await this.roleService.getByIds(
        user.roles.map((r) => r.id)
      );
      item.roles = roles;
    }

    return this.repo.create(item);
  }

}
