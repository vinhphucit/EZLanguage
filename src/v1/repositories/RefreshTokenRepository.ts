
import { Model } from "mongoose";
import { Service } from "typedi";
import RefreshToken, { IRefreshToken } from "../models/dao/RefreshToken";
import ResetPassword, { IResetPassword } from "../models/dao/ResetPassword";
import { BaseRepository } from "./BaseRepository";

@Service()
export class RefreshTokenRepository extends BaseRepository<IRefreshToken> {
    setModel(): Model<IRefreshToken>{
        return RefreshToken;
    }
}