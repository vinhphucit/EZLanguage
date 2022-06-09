import { BadRequestException } from "../../base/exceptions/BadRequestException";
import { NotFoundException } from "../../base/exceptions/NotFoundException";
import { Service } from "typedi";
import { UserChoreRepository } from "../repositories/UserChoreRepository";
import { IUserChore } from "../models/dao/UserChore";
import { nowAfter, timeInSecondAfter } from "../utils/DateUtils";
import { env } from "../../Env";

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
    userId: string,
    code: string
  ): Promise<IUserChore | undefined> {
    const entity = await this.getByUserId(userId);
    if (!entity) {
      const item: Partial<IUserChore> = {
        userId,
        emailVerificationCode: code,
        emailVerificationExpiredAt: timeInSecondAfter(
          env.auth.emailVerificationExpiresIn
        ),
      };
      return await this.repo.create(item);
    } else {
      entity.emailVerificationCode = code;
      entity.emailVerificationExpiredAt = timeInSecondAfter(
        env.auth.emailVerificationExpiresIn
      );

      return await this.repo.updateById(entity.id, entity);
    }
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

    return await this.repo.updateById(entity.id, entity);
  }
  async verifyRefreshTokenByUserId(
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
