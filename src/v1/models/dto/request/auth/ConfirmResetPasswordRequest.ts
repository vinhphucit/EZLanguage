import {IsEmail, IsOptional, IsString, Length, MaxLength} from 'class-validator';
import {IsNotEmptyString} from "../../../../utils/validation/IsNotEmptyString";

export class ConfirmResetPasswordRequest {
    @IsNotEmptyString()
    email: string;    
    @IsNotEmptyString()
    password: string;
    @IsNotEmptyString()
    token: string;
}
