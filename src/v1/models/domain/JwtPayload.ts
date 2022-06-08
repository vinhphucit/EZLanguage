import { IPermission } from "../dao/Permission";
import { IUser } from "../dao/User";
import { JwtUser } from "./JwtUser";

export class JwtPayload {
    user:JwtUser;
    roles:string[];
    permissions:string[];
    constructor()
    constructor(result: IUser)
    constructor(result?: IUser){
        this.user = new JwtUser(result);
        this.roles = result.roles.map(r=>r.name);
        this.permissions = this.allPermissions(result);
    }


    /**
     * Resolves all permissions granted to this user through groups.
     */
     public inheritedPermissions(user: IUser): IPermission[] {
        let returnPermissions: IPermission[] = new Array<IPermission>();

        if (!user || !user.roles) {
            return returnPermissions;
        }
        
        for (let group of user.roles) {
            if (group.permissions) {
                for (let permission of group.permissions) {
                    returnPermissions.push(permission);
                }
            }
        }

        return returnPermissions.reduce((acc, current) => {
            const x = acc.find(item => item.id === current.id);
            if (!x) {
                return acc.concat([current]);
            } else {
                return acc;
            }
        }, []);
    }


    /**
     * Resolves all permissions granted to this user through groups or directly to the string enum format.
     * Also deduplicates the array.
     */
    public allPermissions(user: IUser): string[] {
        let returnPermissions: string[] = new Array<string>();

        if (!user || !user.roles) {
            return returnPermissions;
        }
        for (let group of user.roles) {
            if (group.permissions) {
                for (let permission of group.permissions) {
                    returnPermissions.push(permission.code);
                }
            }
        }
        return Array.from(new Set(returnPermissions));
    }

}
