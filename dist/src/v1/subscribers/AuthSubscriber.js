"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
const event_dispatch_1 = require("event-dispatch");
const typedi_1 = __importDefault(require("typedi"));
const Mailer_1 = require("../utils/Mailer");
const Events_1 = __importDefault(require("./Events"));
let PmsPropertySubscriber = class PmsPropertySubscriber {
    onUserRegistered(userChore) {
        return __awaiter(this, void 0, void 0, function* () {
            const mailer = typedi_1.default.get(Mailer_1.Mailer);
            yield mailer.sendRegistrationMail(userChore.email, userChore.emailVerificationCode, new Date(userChore.emailVerificationExpiredAt * 1000));
        });
    }
    onUserResetPassword(userChore) {
        return __awaiter(this, void 0, void 0, function* () {
            const mailer = typedi_1.default.get(Mailer_1.Mailer);
            yield mailer.sendResetPasswordMail(userChore.email, userChore.resetPasswordCode, new Date(userChore.resetPasswordExpiredAt * 1000));
        });
    }
};
__decorate([
    (0, event_dispatch_1.On)(Events_1.default.auth.register),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PmsPropertySubscriber.prototype, "onUserRegistered", null);
__decorate([
    (0, event_dispatch_1.On)(Events_1.default.auth.resetPassword),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PmsPropertySubscriber.prototype, "onUserResetPassword", null);
PmsPropertySubscriber = __decorate([
    (0, event_dispatch_1.EventSubscriber)()
], PmsPropertySubscriber);
exports.default = PmsPropertySubscriber;
//# sourceMappingURL=AuthSubscriber.js.map