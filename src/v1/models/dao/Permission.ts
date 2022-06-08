import {Document, Model, Schema} from 'mongoose';
import EzMongooseConnection from "../../providers/EzMongooseConnection";
import { CollectionNames } from "./CollectionNames";

export interface IPermission extends Document {
    name: string,
    code: string,
    createdAt: Date;
    updatedAt: Date;
}
export interface IPermissionModel extends Model<IPermission> {
}

export const permissionSchema = new Schema<IPermission>({
    name: String,
    code: String
}, {
    timestamps: true
});

const Permission: IPermissionModel = EzMongooseConnection.model<IPermission, IPermissionModel>(CollectionNames.PERMISSION, permissionSchema);

export default Permission;
