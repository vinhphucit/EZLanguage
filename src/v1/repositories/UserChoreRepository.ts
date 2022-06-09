
import { Model } from "mongoose";
import { Service } from "typedi";
import UserChore, { IUserChore } from "../models/dao/UserChore";
import { BaseRepository } from "./BaseRepository";

@Service()
export class UserChoreRepository extends BaseRepository<IUserChore> {
    setModel(): Model<IUserChore>{
        return UserChore;
    }
}