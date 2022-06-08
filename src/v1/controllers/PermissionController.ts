import { Service } from "typedi";
import {NextFunction, Request, Response} from "express";
import { SuccessResponse } from "../../base/models/dto/response/success/SuccessResponse";
import { PermissionService } from "../services/PermissionService";
import { CreatePermissionRequest } from "../models/dto/request/permission/CreatePermissionRequest";
import { CreatePermissionResponse } from "../models/dto/response/permission/CreatePermissionResponse";
import { GetPermissionsResponse } from "../models/dto/response/permission/GetPermissionsResponse";
import { GetPermissionByIdResponse } from "../models/dto/response/permission/GetPermissionByIdResponse";
import { NoContentResponse } from "../../base/models/dto/response/success/NoContentResponse";
import { UpdatePermissionByIdResponse } from "../models/dto/response/permission/UpdatePermissionByIdResponse";
@Service()
export class PermissionController {
    constructor(private readonly service: PermissionService){
    }

    public async create(req: Request, res: Response, next: NextFunction) {
        try {            
            const request: CreatePermissionRequest = req.body;
            const result = await this.service.create(request)
            next(new SuccessResponse(new CreatePermissionResponse(result)));
        } catch (e) {
            return next(e)
        }
    }
    
    public async get(req: Request, res: Response, next: NextFunction) {
        try {            
            const {limit, start, sort, query} = req.query as any;
            const result = await this.service.get(limit, start, sort, query)
            next(new SuccessResponse(new GetPermissionsResponse(result.items.map(value => new GetPermissionByIdResponse(value)), result.start, result.limit, result.totalItems, result.sort, result.query)))
        } catch (e) {
            return next(e)
        }
    }

    public async getById(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id;            
            const result = await this.service.getById(id)
            next(new SuccessResponse(new GetPermissionByIdResponse(result)))
        } catch (e) {
            return next(e)
        }
    }
    public async updateById(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id;
            const request = req.body;            
            const result = await this.service.updateById(id, request)
            next(new SuccessResponse(new UpdatePermissionByIdResponse(result)))
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