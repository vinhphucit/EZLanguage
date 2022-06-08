import {Document, Model, Schema} from 'mongoose';
import EzMongooseConnection from "../../providers/EzMongooseConnection";
import { CollectionNames } from "./CollectionNames";
import { IPermission, permissionSchema } from './Permission';

export interface IRole extends Document {
    name: string,
    permissions: IPermission[],
    createdAt: Date;
    updatedAt: Date;
}
export interface IRoleModel extends Model<IRole> {
}

export const roleSchema = new Schema<IRole>({
    name: String,    
    permissions: [permissionSchema]
}, {
    timestamps: true
});

const Role: IRoleModel = EzMongooseConnection.model<IRole, IRoleModel>(CollectionNames.ROLE, roleSchema);

export default Role;
