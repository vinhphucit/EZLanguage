import { IRole } from "../dao/Role";

export class RoleDomain {
    id: string;
    name: string;
    code: string;    
    createdAt: Date;
    updatedAt: Date;
    constructor() ;
    constructor(result: IRole);
    constructor(result?: IRole) {
        if (!result) return;
        this.id = result._id;         
        this.name = result.name;
        this.code = result.code;
        this.createdAt = result.createdAt;
        this.updatedAt = result.updatedAt;
    }

}
