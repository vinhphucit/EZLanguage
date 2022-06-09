
import {IsNotEmptyString} from "../../../../utils/validation/IsNotEmptyString";

export class SignOutRequest {    
    @IsNotEmptyString()
    token: string;    
}
