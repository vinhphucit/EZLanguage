import { BadRequestException } from "../../base/exceptions/BadRequestException";
import { NotFoundException } from "../../base/exceptions/NotFoundException";
import { Inject, Service } from "typedi";
import { BaseList } from "../models/dao/BaseList";
import { IRole } from "../models/dao/Role";
import { CreateRoleRequest } from "../models/dto/request/role/CreateRoleRequest";
import { UpdateRoleRequest } from "../models/dto/request/role/UpdateRoleRequest";
import { RoleRepository } from "../repositories/RoleRepository";
import { switchNull } from "../utils/StringUtils";
import { PermissionService } from "./PermissionService";


@Service()
export class RoleService {
    @Inject()
    permissionService: PermissionService;

    constructor(private readonly repo: RoleRepository){

    }

    public async create(role: CreateRoleRequest): Promise<IRole>{    
        const foundRole = await this.getByName(role.name);
        if (foundRole) {
          throw new BadRequestException(`Role ${role.name} already existed`);
        }

        let item: Partial<IRole> = {
            name: role.name         
        }

        if(role.permissions){
            const pers = await this.permissionService.getByCodes(role.permissions);
            item.permissions = pers;
        }

        return this.repo.create(item);
    }

    async get(limit: string, start: string, sort: string, query: string): Promise<BaseList<IRole>> {
        return await this.repo.get(limit, start, sort, query);
    }
    
    async getById(id: string): Promise<IRole> {
        const result = await this.repo.getById(id);
        if (!result) throw new NotFoundException(`User ${id} doesn't exist`);        
        return result;
    }
    async getByIds(ids: string[]): Promise<IRole[]> {
        return await this.repo.getByIds(ids);        
      }
    
    async getByName(name: string): Promise<IRole | undefined> {
        const result = await this.repo.get(
          `1`,
          `0`,
          undefined,
          `name%eq%${name}`
        );
        if (!result || result.totalItems == 0) return undefined;
        return result.items[0];
      }

    async updateById(id: string, request: UpdateRoleRequest): Promise<IRole | undefined> {
        const entity = await this.getById(id)        
        if(request.name){
            const existingNameEntity = await this.getByName(request.name)
            if(entity.id !== existingNameEntity.id){
                throw new BadRequestException(`Role ${request.name} already existed`)
            }
        }
        
        if(request.permissions){
            const pers = await this.permissionService.getByCodes(request.permissions);
            entity.permissions = pers;
        }

        entity.name = switchNull(request.name, entity.name);                

        const updateEntity = await this.repo.updateById(id, entity);
        
        return updateEntity;
    }

    async deleteById(id: string): Promise<IRole> {
        await this.getById(id)
        return this.repo.removeById(id);
    }

}