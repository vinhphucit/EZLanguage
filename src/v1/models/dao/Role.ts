import {Document, Model, Schema} from 'mongoose';
import EzMongooseConnection from "../../../base/providers/EzMongooseConnection";
import { CollectionNames } from "./CollectionNames";

export interface IRole extends Document {
    name: string,
    code: string,
    createdAt: Date;
    updatedAt: Date;
}
export interface IRoleModel extends Model<IRole> {
}

export const roleSchema = new Schema<IRole>({
    name: String,
    code: String
}, {
    timestamps: true
});

const Role: IRoleModel = EzMongooseConnection.model<IRole, IRoleModel>(CollectionNames.ROLE, roleSchema);

export default Role;
