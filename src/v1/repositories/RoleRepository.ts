
import { Model } from "mongoose";
import { Service } from "typedi";
import Role, { IRole } from "../models/dao/Role";
import { BaseRepository } from "./BaseRepository";

@Service()
export class RoleRepository extends BaseRepository<IRole> {
    setModel(): Model<IRole>{
        return Role;
    }
}