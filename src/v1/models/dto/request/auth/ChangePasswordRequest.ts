import {IsEmail, IsOptional, IsString, Length, MaxLength} from 'class-validator';
import {IsNotEmptyString} from "../../../../utils/validation/IsNotEmptyString";

export class ChangePasswordRequest {
    @IsString()
    @Length(1, 50)
    @IsNotEmptyString()
    oldPassword: string
    @IsString()
    @Length(1, 50)
    @IsNotEmptyString()
    newPassword: string
}
