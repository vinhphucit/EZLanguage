import {IsEmail, IsOptional, IsString, Length, MaxLength} from 'class-validator';
import {IsNotEmptyString} from "../../../../utils/validation/IsNotEmptyString";

export class ResetPasswordRequest {
    @IsEmail()
    @Length(1, 100)
    @IsNotEmptyString()
    email: string;
}
