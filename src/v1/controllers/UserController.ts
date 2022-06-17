import { Inject, Service } from "typedi";
import { UserService } from "../services/UserService";
import { NextFunction, Request, Response } from "express";
import { SuccessResponse } from "../../base/models/dto/response/success/SuccessResponse";
import { CreateUserResponse } from "../models/dto/response/user/CreateUserResponse";
import { CreateUserRequest } from "../models/dto/request/user/CreateUserRequest";
import { GetUsersResponse } from "../models/dto/response/user/GetUsersResponse";
import { GetUserByIdResponse } from "../models/dto/response/user/GetUserByIdResponse";
import { NoContentResponse } from "../../base/models/dto/response/success/NoContentResponse";
import { UpdateUserByIdResponse } from "../models/dto/response/user/UpdateUserByIdResponse";
import { UpdateUserByIdRequest } from "../models/dto/request/user/UpdateUserByIdRequest";
import { UserChoreService } from "../services/UserChoreService";
import { UserDomain } from "../models/domain/UserDomain";
@Service()
export class UserController {
  @Inject()
  private readonly userChoreService: UserChoreService;
  constructor(private readonly service: UserService) {}

  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const request: CreateUserRequest = req.body;
      const result = await this.service.create(
        UserDomain.fromCreateRequest(request)
      );
      await this.userChoreService.updateEmailVerificationCodeByUserId(result);
      next(new SuccessResponse(new CreateUserResponse(result)));
    } catch (e) {
      return next(e);
    }
  }
  public async get(req: Request, res: Response, next: NextFunction) {
    try {
      const { limit, start, sort, query } = req.query as any;
      const result = await this.service.get(limit, start, sort, query);
      next(
        new SuccessResponse(
          new GetUsersResponse(
            result.items.map((value) => new GetUserByIdResponse(value)),
            result.start,
            result.limit,
            result.totalItems,
            result.sort,
            result.query
          )
        )
      );
    } catch (e) {
      return next(e);
    }
  }
  public async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const result = await this.service.getById(id);
      next(new SuccessResponse(new GetUserByIdResponse(result)));
    } catch (e) {
      return next(e);
    }
  }

  public async updateById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const request: UpdateUserByIdRequest = req.body;
      const result = await this.service.updateById(id, request);
      next(new SuccessResponse(new UpdateUserByIdResponse(result)));
    } catch (e) {
      return next(e);
    }
  }

  public async deleteById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      await this.service.deleteById(id);
      next(new NoContentResponse());
    } catch (e) {
      return next(e);
    }
  }
}
