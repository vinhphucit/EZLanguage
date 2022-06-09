"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserChoreRepository = void 0;
const typedi_1 = require("typedi");
const UserChore_1 = __importDefault(require("../models/dao/UserChore"));
const BaseRepository_1 = require("./BaseRepository");
let UserChoreRepository = class UserChoreRepository extends BaseRepository_1.BaseRepository {
    setModel() {
        return UserChore_1.default;
    }
};
UserChoreRepository = __decorate([
    (0, typedi_1.Service)()
], UserChoreRepository);
exports.UserChoreRepository = UserChoreRepository;
//# sourceMappingURL=UserChoreRepository.js.map