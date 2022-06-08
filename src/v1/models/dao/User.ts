import {Document, Model, Schema} from 'mongoose';
import { UserStatus } from '../../enums/UserStatus';
import EzMongooseConnection from "../../providers/EzMongooseConnection";
import { CollectionNames } from "./CollectionNames";
import { IRole, roleSchema } from './Role';

export interface IUser extends Document {
    password: string,
    firstName: string,
    lastName: string,
    title: string,
    address: string,
    email: string,
    mobile: string,
    roles: IRole[],
    status: string,
    createdAt: Date,
    updatedAt: Date
}
export interface IUserModel extends Model<IUser> {
}

export const userSchema = new Schema<IUser>({
    email: String,    
    password: String,
    firstName: String,
    lastName: String,
    title: String,
    address: String,    
    mobile: String,
    status: {
        type:String,
        enum: [UserStatus.NOT_ACTIVE, UserStatus.ACTIVE, UserStatus.BLOCK],
        default: UserStatus.NOT_ACTIVE
    },
    roles:[roleSchema]
}, {
    timestamps: true
});

const User: IUserModel = EzMongooseConnection.model<IUser, IUserModel>(CollectionNames.USER, userSchema);

export default User;
