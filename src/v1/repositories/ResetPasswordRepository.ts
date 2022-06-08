
import { Model } from "mongoose";
import { Service } from "typedi";
import ResetPassword, { IResetPassword } from "../models/dao/ResetPassword";
import { BaseRepository } from "./BaseRepository";

@Service()
export class ResetPasswordRepository extends BaseRepository<IResetPassword> {
    setModel(): Model<IResetPassword>{
        return ResetPassword;
    }
}