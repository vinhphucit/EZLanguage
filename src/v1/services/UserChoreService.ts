import { BadRequestException } from "../../base/exceptions/BadRequestException";
import { NotFoundException } from "../../base/exceptions/NotFoundException";
import { Service } from "typedi";
import { UserChoreRepository } from "../repositories/UserChoreRepository";
import { IUserChore } from "../models/dao/UserChore";
import { nowAfter, timeInSecondAfter } from "../utils/DateUtils";
import { env } from "../../Env";
import { EventDispatcher } from "event-dispatch";
import Events from "../subscribers/Events";
import { IUser } from "../models/dao/User";
import { genRandomString } from "../utils/StringUtils";

@Service()
export class UserChoreService {
  constructor(private readonly repo: UserChoreRepository) {}

  async getByUserId(userId: string): Promise<IUserChore | undefined> {
    const result = await this.repo.get(
      `1`,
      `0`,
      undefined,
      `userId%eq%${userId}`
    );
    if (!result || result.totalItems == 0) return undefined;
    return result.items[0];
  }

  async updateEmailVerificationCodeByUserId(
    user: IUser
  ): Promise<IUserChore | undefined> {
    const entity = await this.getByUserId(user.id);
    let updatedUserChore;
    const verificationCode = genRandomString(10);
    if (!entity) {
      const item: Partial<IUserChore> = {
        userId: user.id,
        email: user.email,
        emailVerificationCode: verificationCode,
        emailVerificationExpiredAt: timeInSecondAfter(
          env.auth.emailVerificationExpiresIn
        ),
      };
      updatedUserChore = await this.repo.create(item);
    } else {
      if (!entity.emailVerificationCode || nowAfter(entity.emailVerificationExpiredAt)) {
        entity.emailVerificationCode = verificationCode;
        entity.emailVerificationExpiredAt = timeInSecondAfter(
          env.auth.emailVerificationExpiresIn
        );
      }
      updatedUserChore = await this.repo.updateById(entity.id, entity);
    }
    new EventDispatcher().dispatch(Events.auth.register, updatedUserChore);
    return updatedUserChore;
  }

  async verifyEmailVerificationCodeByUserId(
    userId: string,
    code: string
  ): Promise<IUserChore | undefined> {
    const entity = await this.getByUserId(userId);
    if (!entity) throw new NotFoundException(`UserId ${userId} not found`);

    if (
      nowAfter(entity.emailVerificationExpiredAt) ||
      entity.emailVerificationTriedCount > env.auth.emailVerificationMaxTryCount
    ) {
      throw new BadRequestException(`This code is not valid`);
    }

    entity.emailVerificationTriedCount++;
    if (entity.emailVerificationCode !== code) {
      await this.repo.updateById(entity.id, entity);
      throw new BadRequestException(`This code is not valid`);
    } else {
      entity.emailVerificationActivatedAt = new Date();
      await this.repo.updateById(entity.id, entity);
    }

    return entity;
  }

  async updateResetPasswordCodeByUserId(
    userId: string,
    code: string
  ): Promise<IUserChore | undefined> {
    const entity = await this.getByUserId(userId);

    if (!entity) {
      const item: Partial<IUserChore> = {
        userId,
        resetPasswordCode: code,
        resetPasswordExpiredAt: timeInSecondAfter(
          env.auth.resetPasswordExpiresIn
        ),
      };
      return await this.repo.create(item);
    } else {
      entity.resetPasswordCode = code;
      entity.resetPasswordExpiredAt = timeInSecondAfter(
        env.auth.resetPasswordExpiresIn
      );
    }

    const updatedUserChore = await this.repo.updateById(entity.id, entity);
    new EventDispatcher().dispatch(Events.auth.resetPassword, updatedUserChore);
    return updatedUserChore;
  }

  async verifyResetPasswordCodeById(
    userId: string,
    code: string
  ): Promise<IUserChore | undefined> {
    const entity = await this.getByUserId(userId);
    if (!entity) throw new NotFoundException(`UserId ${userId} not found`);

    if (
      nowAfter(entity.resetPasswordExpiredAt) ||
      entity.resetPasswordTriedCount > env.auth.resetPasswordMaxTryCount
    ) {
      throw new BadRequestException(`This code is not valid`);
    }

    entity.resetPasswordTriedCount++;
    if (entity.resetPasswordCode !== code) {
      await this.repo.updateById(entity.id, entity);
      throw new BadRequestException(`This code is not valid`);
    } else {
      entity.emailVerificationActivatedAt = new Date();
      await this.repo.updateById(entity.id, entity);
    }

    return entity;
  }
}
