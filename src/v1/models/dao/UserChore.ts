import { Document, Model, Schema } from "mongoose";
import EzMongooseConnection from "../../providers/EzMongooseConnection";
import { CollectionNames } from "./CollectionNames";

export interface IUserChore extends Document {
  userId: string;
  email: string,
  emailVerificationCode: string;
  emailVerificationExpiredAt: number;
  emailVerificationTriedCount: number;
  emailVerificationActivatedAt: Date;
  resetPasswordCode: string,
  resetPasswordExpiredAt: number;
  resetPasswordTriedCount: number;
  createdAt: Date;
  updatedAt: Date;
}
export interface IUserChoreModel extends Model<IUserChore> {}

export const userChoseSchema = new Schema<IUserChore>(
  {
    userId: String,
    email: String,
    emailVerificationCode: String,
    emailVerificationExpiredAt: {
      type: Number,
      default: 0,
    },
    emailVerificationTriedCount: {
      type: Number,
      default: 0,
    },
    emailVerificationActivatedAt: Date,
    resetPasswordCode: String,
    resetPasswordExpiredAt: {
      type: Number,
      default: 0,
    },
    resetPasswordTriedCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const UserChore: IUserChoreModel = EzMongooseConnection.model<
  IUserChore,
  IUserChoreModel
>(CollectionNames.USER_CHORE, userChoseSchema);

export default UserChore;
