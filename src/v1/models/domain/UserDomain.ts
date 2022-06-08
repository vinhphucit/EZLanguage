import { IUser } from "../dao/User";
import { PermissionDomain } from "./PermissionDomain";
import { RoleDomain } from "./RoleDomain";

export class UserDomain {
    id: string;
    password: string;
    firstName: string;
    lastName: string;
    title: string;
    address: string;
    email: string;
    mobile: string;
    status: string;
    roles: RoleDomain[];
    createdAt: Date;
    updatedAt: Date;
    constructor() ;
    constructor(result: IUser);
    constructor(result?: IUser) {
        if (!result) return;
        this.id = result._id;         
        // this.password = result.password;
        this.firstName = result.firstName;
        this.lastName = result.lastName;
        this.title = result.title;
        this.address = result.address;
        this.email = result.email;
        this.mobile = result.mobile;
        this.status = result.status;
        this.roles = result.roles.map(r=> new RoleDomain(r));
        this.createdAt = result.createdAt;
        this.updatedAt = result.updatedAt;
    }

}
