
import {IsNotEmptyString} from "../../../../utils/validation/IsNotEmptyString";

export class RefreshTokenRequest {    
    @IsNotEmptyString()
    token: string;    
}
