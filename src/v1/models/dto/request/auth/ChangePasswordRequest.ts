import {IsEmail, IsOptional, IsString, Length, MaxLength} from 'class-validator';
import {IsNotEmptyString} from "../../../../utils/validation/IsNotEmptyString";

export class ChangePasswordRequest {
    @IsEmail()
    @Length(1, 100)
    @IsNotEmptyString()
    email: string;
    @IsString()
    @Length(1, 50)
    @IsNotEmptyString()
    oldPassword: string
    @IsString()
    @Length(1, 50)
    @IsNotEmptyString()
    newPassword: string
}
