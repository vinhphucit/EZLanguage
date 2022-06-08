
import { Model } from "mongoose";
import { Service } from "typedi";
import Permission, { IPermission } from "../models/dao/Permission";
import { BaseRepository } from "./BaseRepository";

@Service()
export class PermissionRepository extends BaseRepository<IPermission> {
    setModel(): Model<IPermission>{
        return Permission;
    }

    public async getByCodes(codes: string[]): Promise<IPermission[] | undefined> {
        
        const filter = {
            code: {
                "$in": codes
            }
        }

        return await this._model.find(filter);

        
    }

}