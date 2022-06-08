import {IsEmail, IsOptional, IsString, Length, MaxLength} from 'class-validator';
import {IsNotEmptyString} from "../../../../utils/validation/IsNotEmptyString";

export class RefreshTokenRequest {
    @IsEmail()
    @Length(1, 100)
    @IsNotEmptyString()
    token: string;    
}
