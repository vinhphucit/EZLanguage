
import { Model } from "mongoose";
import { Service } from "typedi";
import User, { IUser } from "../models/dao/User";
import { BaseRepository } from "./BaseRepository";

@Service()
export class UserRepository extends BaseRepository<IUser> {
    setModel(): Model<IUser>{
        return User;
    }
}