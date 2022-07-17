"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Seeder = void 0;
const UserStatus_1 = require("../enums/UserStatus");
const Permission_1 = __importDefault(require("../models/dao/Permission"));
const Role_1 = __importDefault(require("../models/dao/Role"));
const User_1 = __importDefault(require("../models/dao/User"));
const CryptoUtils_1 = require("../utils/auth/CryptoUtils");
class Seeder {
    run() {
        return __awaiter(this, void 0, void 0, function* () {
            const pAdminModels = ["u", "r", "p"];
            const pFlashcardModels = ["ca", "fc"];
            const pActions = ["c", "r", "rid", "uid", "did"];
            let pAdminData = this.modelActionToJson(pAdminModels, pActions);
            let pFlashCardData = this.modelActionToJson(pFlashcardModels, pActions);
            // console.log(JSON.stringify(pData));
            yield Permission_1.default.collection.drop();
            yield Role_1.default.collection.drop();
            yield User_1.default.collection.drop();
            // await Role.insertMany()
            const insertedAdminPermissions = yield Permission_1.default.insertMany(pAdminData);
            const insertedFlashCardPermissions = yield Permission_1.default.insertMany(pFlashCardData);
            const insertedAdminRole = yield Role_1.default.create({
                name: "Admin",
                permissions: [...insertedAdminPermissions, ...insertedFlashCardPermissions],
            });
            const insertedUserRole = yield Role_1.default.create({
                name: "User",
                permissions: insertedFlashCardPermissions,
            });
            const insertedGuestRole = yield Role_1.default.create({
                name: "Guest",
            });
            const insertedAdminUser = yield User_1.default.create({
                email: 'admin@ezlang.com',
                password: yield CryptoUtils_1.CryptoUtils.hashPassword('123abc.com'),
                firstName: 'Phuc',
                lastName: 'Tran',
                status: UserStatus_1.UserStatus.ACTIVE,
                roles: insertedAdminRole
            });
        });
    }
    modelActionToJson(pModels, pActions) {
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
exports.Seeder = Seeder;
//# sourceMappingURL=Seeder.js.map