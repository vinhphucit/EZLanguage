import { RoleService } from "../../services/RoleService";
import { CryptoUtils } from "../../utils/auth/CryptoUtils";
import Container from "typedi";
import { IUser } from "../dao/User";
import { SignUpRequest } from "../dto/request/auth/SignUpRequest";
import { CreateUserRequest } from "../dto/request/user/CreateUserRequest";
import { PermissionDomain } from "./PermissionDomain";
import { RoleDomain } from "./RoleDomain";

export class UserDomain {
  id: string;
  password: string;
  firstName: string;
  lastName: string;
  title: string;
  address: string;
  email: string;
  mobile: string;
  status: string;
  roles: RoleDomain[];
  createdAt: Date;
  updatedAt: Date;
  constructor();
  constructor(result: IUser);
  constructor(result?: IUser) {
    if (!result) return;
    this.id = result._id;
    // this.password = result.password;
    this.firstName = result.firstName;
    this.lastName = result.lastName;
    this.title = result.title;
    this.address = result.address;
    this.email = result.email;
    this.mobile = result.mobile;
    this.status = result.status;
    this.roles = result.roles.map((r) => new RoleDomain(r));
    this.createdAt = result.createdAt;
    this.updatedAt = result.updatedAt;
  }

  public static async fromRegisterRequest(
    result: SignUpRequest
  ): Promise<UserDomain> {
    let self = new this();
    self.password = await CryptoUtils.hashPassword(result.password);
    self.firstName = result.firstName;
    self.lastName = result.lastName;
    self.title = result.title;
    self.address = result.address;
    self.email = result.email;
    self.mobile = result.mobile;

    const roleService = Container.get(RoleService);
    const userRole = await roleService.getByName("User");
    if (userRole) self.roles = [new RoleDomain(userRole)];
    return self;
  }

  public static  fromCreateRequest(
    result: CreateUserRequest
  ): UserDomain {
    let self = new this();
    self.firstName = result.firstName;
    self.lastName = result.lastName;
    self.title = result.title;
    self.address = result.address;
    self.email = result.email;
    self.mobile = result.mobile;
    if (result.roles) {
      self.roles = result.roles.map((r) => {
        let role = new RoleDomain();
        role.id = r.id;
        return role;
      });
    }
    return self;
  }
}
