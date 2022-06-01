import { IUser } from "../dao/User";

export class UserDomain {
    id: string;
    password: string;
    firstName: string;
    lastName: string;
    title: string;
    address: string;
    email: string;
    mobile: string;
    postcode: string;
    countryId: string;
    birthday: string;
    propertyId: string;
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
        this.createdAt = result.createdAt;
        this.updatedAt = result.updatedAt;
    }

}
