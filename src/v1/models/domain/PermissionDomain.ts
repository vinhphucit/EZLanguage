import { IPermission } from "../dao/Permission";
import { IRole } from "../dao/Role";

export class PermissionDomain {
    id: string;
    name: string;
    code: string;    
    createdAt: Date;
    updatedAt: Date;
    constructor() ;
    constructor(result: IPermission);
    constructor(result?: IPermission) {
        if (!result) return;
        this.id = result._id;         
        this.name = result.name;
        this.code = result.code;
        this.createdAt = result.createdAt;
        this.updatedAt = result.updatedAt;
    }

}
