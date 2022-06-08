import { IRole } from "../dao/Role";
import { PermissionDomain } from "./PermissionDomain";

export class RoleDomain {
  id: string;
  name: string;
  permissions: PermissionDomain[];
  createdAt: Date;
  updatedAt: Date;
  constructor();
  constructor(result: IRole);
  constructor(result?: IRole) {
    if (!result) return;
    this.id = result._id;
    this.name = result.name;
    this.createdAt = result.createdAt;
    this.updatedAt = result.updatedAt;
    if (result.permissions) {
      this.permissions = result.permissions.map((i) => new PermissionDomain(i));
    }
  }
}
