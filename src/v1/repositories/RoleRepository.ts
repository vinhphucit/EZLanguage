
import { Model } from "mongoose";
import { Service } from "typedi";
import Role, { IRole } from "../models/dao/Role";
import { BaseRepository } from "./BaseRepository";

@Service()
export class RoleRepository extends BaseRepository<IRole> {
    setModel(): Model<IRole>{
        return Role;
    }

    public async getByIds(ids: string[]): Promise<IRole[] | undefined> {
        
        const filter = {
            _id: {
                "$in": ids
            }
        }

        return await this._model.find(filter);

        
    }

}