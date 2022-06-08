import {IsEmail, IsOptional, IsString, Length, MaxLength} from 'class-validator';
import {IsNotEmptyString} from "../../../../utils/validation/IsNotEmptyString";

export class ConfirmResetPasswordRequest {
    @IsEmail()
    @Length(1, 100)
    @IsNotEmptyString()
    email: string;
    @IsEmail()
    @Length(1, 100)
    @IsNotEmptyString()
    password: string;
    @IsEmail()
    @Length(1, 100)
    @IsNotEmptyString()
    token: string;
}
