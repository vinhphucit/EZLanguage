import { IsString, Length } from "class-validator";
import { IsNotEmptyString } from "../../../../utils/validation/IsNotEmptyString";

export class UserRoleRequest{
    @IsString()
    @Length(1, 50)
    @IsNotEmptyString()
    public id: string
}