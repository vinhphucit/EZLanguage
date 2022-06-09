"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CollectionNames = void 0;
let subfix = "";
if (process.env.ENV == "test") {
    subfix = "_test";
}
class CollectionNames {
}
exports.CollectionNames = CollectionNames;
CollectionNames.USER = "user" + subfix;
CollectionNames.USER_CHORE = "user_chore" + subfix;
CollectionNames.ROLE = "role" + subfix;
CollectionNames.PERMISSION = "permission" + subfix;
CollectionNames.REFRESH_TOKEN = "refresh_token" + subfix;
CollectionNames.RESET_PASSWORD = "reset_password" + subfix;
//# sourceMappingURL=CollectionNames.js.map