import {Document, Model, Schema} from 'mongoose';
import EzMongooseConnection from "../../providers/EzMongooseConnection";
import { CollectionNames } from "./CollectionNames";

export interface IResetPassword extends Document {
    token: string,
    userId: string,
    expiresIn: number,
    active: boolean,
    createdAt: Date;
    updatedAt: Date;
}
export interface IResetPasswordModel extends Model<IResetPassword> {
}

export const resetPasswordSchema = new Schema<IResetPassword>({
    token: String,
    userId: String,
    expiresIn: Number,
    active: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

const ResetPassword: IResetPasswordModel = EzMongooseConnection.model<IResetPassword, IResetPasswordModel>(CollectionNames.RESET_PASSWORD, resetPasswordSchema);

export default ResetPassword;
