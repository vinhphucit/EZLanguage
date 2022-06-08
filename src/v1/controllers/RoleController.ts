import { Service } from "typedi";
import {NextFunction, Request, Response} from "express";
import { SuccessResponse } from "../../base/models/dto/response/success/SuccessResponse";
import { RoleService } from "../services/RoleService";
import { CreateRoleRequest } from "../models/dto/request/role/CreateRoleRequest";
import { CreateRoleResponse } from "../models/dto/response/role/CreateRoleResponse";
import { GetRolesResponse } from "../models/dto/response/role/GetRolesResponse";
import { GetRoleByIdResponse } from "../models/dto/response/role/GetRoleByIdResponse";
import { NoContentResponse } from "../../base/models/dto/response/success/NoContentResponse";
import { UpdateRoleByIdResponse } from "../models/dto/response/role/UpdateRoleByIdResponse";
@Service()
export class RoleController {
    constructor(private readonly service: RoleService){
    }

    public async create(req: Request, res: Response, next: NextFunction) {
        try {            
            const request: CreateRoleRequest = req.body;
            const result = await this.service.create(request)
            next(new SuccessResponse(new CreateRoleResponse(result)));
        } catch (e) {
            return next(e)
        }
    }
    
    public async get(req: Request, res: Response, next: NextFunction) {
        try {            
            const {limit, start, sort, query} = req.query as any;
            const result = await this.service.get(limit, start, sort, query)
            next(new SuccessResponse(new GetRolesResponse(result.items.map(value => new GetRoleByIdResponse(value)), result.start, result.limit, result.totalItems, result.sort, result.query)))
        } catch (e) {
            return next(e)
        }
    }

    public async getById(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id;            
            const result = await this.service.getById(id)
            next(new SuccessResponse(new GetRoleByIdResponse(result)))
        } catch (e) {
            return next(e)
        }
    }
    public async updateById(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id;
            const request = req.body;            
            const result = await this.service.updateById(id, request)
            next(new SuccessResponse(new UpdateRoleByIdResponse(result)))
        } catch (e) {
            return next(e)
        }
    }

    public async deleteById(req: Request, res: Response, next: NextFunction) {
        try {            
            const id = req.params.id;
            await this.service.deleteById(id);
            next(new NoContentResponse())
        } catch (e) {
            return next(e)
        }
    }
}