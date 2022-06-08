import { IUser } from "../dao/User";

export class JwtUser {    
    public id?: string;
    public email?: string;
    public firstname?: string;
    public lastname?: string;
    public status?: string;    

    constructor();
    constructor(user: IUser);
    constructor(user?: IUser) {
        this.id = user.id;
        this.firstname = user.firstName;        
        this.lastname = user.lastName;
        this.email = user.email;
        this.status = user.status;
    }
}