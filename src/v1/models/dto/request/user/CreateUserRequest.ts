import { Type } from 'class-transformer';
import {IsArray, IsEmail, IsOptional, IsString, Length, MaxLength, ValidateNested} from 'class-validator';
import {IsNotEmptyString} from "../../../../utils/validation/IsNotEmptyString";
import { UserRoleRequest } from './UserRoleRequest';

export class CreateUserRequest {
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
    public firstName: string
    @IsString()
    @Length(1, 50)
    @IsNotEmptyString()
    @IsOptional()
    public lastName: string
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
    @IsArray()
    @ValidateNested({each: true})
    @Type(() => UserRoleRequest)
    roles: UserRoleRequest[];
}
