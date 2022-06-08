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
exports.RefreshTokenRepository = void 0;
const typedi_1 = require("typedi");
const RefreshToken_1 = __importDefault(require("../models/dao/RefreshToken"));
const BaseRepository_1 = require("./BaseRepository");
let RefreshTokenRepository = class RefreshTokenRepository extends BaseRepository_1.BaseRepository {
    setModel() {
        return RefreshToken_1.default;
    }
};
RefreshTokenRepository = __decorate([
    (0, typedi_1.Service)()
], RefreshTokenRepository);
exports.RefreshTokenRepository = RefreshTokenRepository;
//# sourceMappingURL=RefreshTokenRepository.js.map