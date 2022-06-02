import { BadRequestException } from "../../base/exceptions/BadRequestException";
import { NotFoundException } from "../../base/exceptions/NotFoundException";
import { Service } from "typedi";
import { BaseList } from "../models/dao/BaseList";
import { IRole } from "../models/dao/Role";

import { CreateRoleRequest } from "../models/dto/request/CreateRoleRequest";
import { UpdateRoleRequest } from "../models/dto/request/UpdateRoleRequest";
import { RoleRepository } from "../repositories/RoleRepository";
import { switchNull } from "../utils/StringUtils";


@Service()
export class RoleService {
    constructor(private readonly repo: RoleRepository){

    }

    public async create(role: CreateRoleRequest): Promise<IRole>{
        const existingRole = await this.getByCode(role.code);
        if(existingRole){
            throw new BadRequestException(`Code ${role.code} already existed`)
        }
        
        let item: Partial<IRole> = {
            name: role.name,
            code: role.code            
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

    async getByCode(code: string): Promise<IRole | undefined> {
        const result = await this.repo.get(`1`,`0`,undefined, `code%eq%${code}`);
        if (!result || result.totalItems == 0) return undefined;
        return result.items[0];
    }

    async updateById(id: string, request: UpdateRoleRequest): Promise<IRole | undefined> {
        const entity = await this.getById(id)
        const existingRole = await this.getByCode(request.code);
        if(existingRole && existingRole.id !== entity.id){
            throw new BadRequestException(`Code ${request.code} already existed`)
        }
        
        entity.name = switchNull(request.name, entity.name);
        entity.code = switchNull(request.code, entity.code);

        const updateEntity = await this.repo.updateById(id, entity);
        
        return updateEntity;
    }

    async deleteById(id: string): Promise<IRole> {
        await this.getById(id)
        return this.repo.removeById(id);
    }

}