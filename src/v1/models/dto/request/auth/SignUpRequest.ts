import {IsEmail, IsOptional, IsString, Length, MaxLength} from 'class-validator';
import { UserDomain } from '../../../../models/domain/UserDomain';
import {IsNotEmptyString} from "../../../../utils/validation/IsNotEmptyString";

export class SignUpRequest {
    @IsEmail()
    @Length(1, 100)
    @IsNotEmptyString()
    email: string;
    @IsString()
    @Length(1, 100)
    @IsNotEmptyString()
    password: string;
    @IsString()
    @Length(1, 50)
    @IsNotEmptyString()
    firstName: string
    @IsString()
    @Length(1, 50)
    @IsNotEmptyString()
    @IsOptional()
    lastName: string
    @IsString()
    @Length(1, 50)
    @IsNotEmptyString()
    @IsOptional()
    public title: string;
    @IsString()
    @Length(1, 50)
    @IsNotEmptyString()
    @IsOptional()
    address: string;    
    @IsString()
    @Length(1, 50)
    @IsNotEmptyString()
    @IsOptional()
    mobile: string;
}
