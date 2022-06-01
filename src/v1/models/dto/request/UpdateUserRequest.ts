import {IsOptional, IsString, Length, MaxLength} from 'class-validator';
import {IsNotEmptyString} from "../../../utils/validation/IsNotEmptyString";

export class UpdateUserRequest {
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
}
