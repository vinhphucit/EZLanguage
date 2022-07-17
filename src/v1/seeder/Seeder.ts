import { UserStatus } from "../enums/UserStatus";
import Permission from "../models/dao/Permission";
import Role from "../models/dao/Role";
import User from "../models/dao/User";
import { CryptoUtils } from "../utils/auth/CryptoUtils";

export class Seeder {
  public async run(): Promise<any> {
    const pAdminModels = ["u", "r", "p"];
    const pFlashcardModels = ["ca", "fc"];
    const pActions = ["c", "r", "rid", "uid", "did"];

    let pAdminData = this.modelActionToJson(pAdminModels, pActions);
    let pFlashCardData = this.modelActionToJson(pFlashcardModels, pActions);
    

    // console.log(JSON.stringify(pData));
    await Permission.collection.drop();
    await Role.collection.drop();
    await User.collection.drop();

    // await Role.insertMany()

    const insertedAdminPermissions = await Permission.insertMany(pAdminData);
    const insertedFlashCardPermissions = await Permission.insertMany(
      pFlashCardData
    );

    const insertedAdminRole = await Role.create({
      name: "Admin",
      permissions: [...insertedAdminPermissions, ... insertedFlashCardPermissions],
    });
    const insertedUserRole = await Role.create({
      name: "User",
      permissions: insertedFlashCardPermissions,
    });
    const insertedGuestRole = await Role.create({
      name: "Guest",
      
    });
    const insertedAdminUser = await User.create({
      email:'admin@ezlang.com',
      password: await CryptoUtils.hashPassword('123abc.com'),
      firstName: 'Phuc',
      lastName: 'Tran',
      status: UserStatus.ACTIVE,
      roles: insertedAdminRole
    })
  }

  private modelActionToJson(pModels: string[], pActions: string[]) {
    let pData = [];
    for (const i of pModels) {
      for (const j of pActions) {
        let name = "";
        switch (i) {
          case "u":
            name = "USER";
            break;
          case "r":
            name = "ROLE";
            break;
          case "p":
            name = "PERMISSION";
            break;
          case "ca":
            name = "CATEGORY";
            break;
          case "fc":
            name = "FLASHCARD";
            break;
        }
        let action = "";
        switch (j) {
          case "c":
            action = "CREATE";
            break;
          case "r":
            action = "READ";
            break;
          case "rid":
            action = "READ BY ID";
            break;
          case "uid":
            action = "UPDATE BY ID";
            break;
          case "did":
            action = "DELETE BY ID";
            break;
        }
        pData.push({ name: `${name} ${action}`, code: `${i}:${j}` });
      }
    }
    return pData;
  }
}
