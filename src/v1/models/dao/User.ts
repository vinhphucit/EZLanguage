import {Document, Model, Schema} from 'mongoose';
import EzMongooseConnection from "../../../base/providers/EzMongooseConnection";
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
    createdAt: Date,
    updatedAt: Date
}
export interface IUserModel extends Model<IUser> {
}

export const userSchema = new Schema<IUser>({
    password: String,
    firstName: String,
    lastName: String,
    title: String,
    address: String,
    email: String,
    mobile: String,
    roles:[roleSchema]
}, {
    timestamps: true
});

const User: IUserModel = EzMongooseConnection.model<IUser, IUserModel>(CollectionNames.USER, userSchema);

export default User;
