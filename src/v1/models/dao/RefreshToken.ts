import {Document, Model, Schema} from 'mongoose';
import { RefreshTokenStatus } from '../../enums/RefreshTokenStatus';
import EzMongooseConnection from "../../providers/EzMongooseConnection";
import { CollectionNames } from "./CollectionNames";

export interface IRefreshToken extends Document {    
    userId: string,
    expiresAt: number,
    status: string,
    tokenChain: string[],
    createdAt: Date;
    updatedAt: Date;
    
}
export interface IRefreshTokenModel extends Model<IRefreshToken> {
}

export const refreshTokenSchema = new Schema<IRefreshToken>({    
    userId: String,
    expiresAt: Number,
    status: {
        type:String,
        enum: [RefreshTokenStatus.ACTIVE, RefreshTokenStatus.BLOCK],
        default: RefreshTokenStatus.ACTIVE
    },
    tokenChain: [String]
}, {
    timestamps: true
});

const RefreshToken: IRefreshTokenModel = EzMongooseConnection.model<IRefreshToken, IRefreshTokenModel>(CollectionNames.REFRESH_TOKEN, refreshTokenSchema);

export default RefreshToken;
