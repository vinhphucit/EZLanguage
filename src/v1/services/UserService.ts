import { BadRequestException } from "../../base/exceptions/BadRequestException";
import { NotFoundException } from "../../base/exceptions/NotFoundException";
import { Service } from "typedi";
import { BaseList } from "../models/dao/BaseList";
import { IUser } from "../models/dao/User";
import { CreateUserRequest } from "../models/dto/request/CreateUserRequest";
import { UpdateUserRequest } from "../models/dto/request/UpdateUserRequest";
import { UserRepository } from "../repositories/UserRepository";
import { switchNull } from "../utils/StringUtils";

@Service()
export class UserService {
    constructor(private readonly repo: UserRepository){

    }

    public async create(user: CreateUserRequest): Promise<IUser>{
        const existingUser = await this.getByEmail(user.email);
        if(existingUser){
            throw new BadRequestException(`Email ${user.email} already existed`)
        }
        
        let item: Partial<IUser> = {
            firstName: user.firstName,
            lastName: user.lastName,
            title: user.title,
            address: user.address,
            email: user.email,
            mobile: user.mobile
        }
        return this.repo.create(item);
    }

    async get(limit: string, start: string, sort: string, query: string): Promise<BaseList<IUser>> {
        return await this.repo.get(limit, start, sort, query);
    }
    
    async getById(id: string): Promise<IUser> {
        const result = await this.repo.getById(id);
        if (!result) throw new NotFoundException(`User ${id} doesn't exist`);        
        return result;
    }

    async getByEmail(email: string): Promise<IUser | undefined> {
        const result = await this.repo.get(`1`,`0`,undefined, `email%eq%${email}`);
        if (!result || result.totalItems == 0) return undefined;
        return result.items[0];
    }

    async updateById(id: string, request: UpdateUserRequest): Promise<IUser | undefined> {
        const entity = await this.getById(id)
                
        
        entity.firstName = switchNull(request.firstName, entity.firstName);
        entity.lastName = switchNull(request.lastName, entity.lastName);
        entity.address = switchNull(request.address, entity.address);
        entity.mobile = switchNull(request.mobile, entity.mobile);
        entity.title = switchNull(request.title, entity.title);

        const updateEntity = await this.repo.updateById(id, entity);
        
        return updateEntity;
    }

    async deleteById(id: string): Promise<IUser> {
        await this.getById(id)
        return this.repo.removeById(id);
    }
}