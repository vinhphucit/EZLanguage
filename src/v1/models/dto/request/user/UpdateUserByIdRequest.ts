import { Type } from 'class-transformer';
import {IsArray, IsOptional, IsString, Length, MaxLength, ValidateNested} from 'class-validator';
import {IsNotEmptyString} from "../../../../utils/validation/IsNotEmptyString";
import { UserRoleRequest } from './UserRoleRequest';

export class UpdateUserByIdRequest {
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
