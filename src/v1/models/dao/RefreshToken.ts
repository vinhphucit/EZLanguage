import {Document, Model, Schema} from 'mongoose';
import EzMongooseConnection from "../../providers/EzMongooseConnection";
import { CollectionNames } from "./CollectionNames";

export interface IRefreshToken extends Document {
    refreshToken: string,
    userId: string,
    expiresIn: number,
    createdAt: Date;
    updatedAt: Date;
}
export interface IRefreshTokenModel extends Model<IRefreshToken> {
}

export const refreshTokenSchema = new Schema<IRefreshToken>({
    refreshToken: String,
    userId: String,
    expiresIn: Number,
}, {
    timestamps: true
});

const RefreshToken: IRefreshTokenModel = EzMongooseConnection.model<IRefreshToken, IRefreshTokenModel>(CollectionNames.REFRESH_TOKEN, refreshTokenSchema);

export default RefreshToken;
