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
exports.Mailer = void 0;
const fs_1 = __importDefault(require("fs"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const path_1 = __importDefault(require("path"));
const Logger_1 = require("../../base/utils/Logger");
const typedi_1 = require("typedi");
const Env_1 = require("../../Env");
/**
 * This class is responsible for all things mail sending.
 * This uses the mail emplates from src/static/mail_templates
 */
let Mailer = class Mailer {
    /**
     * The class's default constructor.
     * Creates the transporter and tests the connection.
     */
    constructor() {
        this.transport = nodemailer_1.default.createTransport({
            host: Env_1.env.mail.mail_server,
            port: Env_1.env.mail.mail_port,
            auth: {
                user: Env_1.env.mail.mail_user,
                pass: Env_1.env.mail.mail_password,
            },
        });
        this.transport.verify(function (error, success) {
            if (error) {
                Logger_1.Logger.info(error.message);
                // throw new InternalServerException(error.message);
            }
        });
    }
    /**
     * Function for sending a test mail from the test mail template.
     * @param to_address The address the mail will be sent to. Should always get pulled from a user object.
     * @param token The requested password reset token - will be combined with the app_url to generate a password reset link.
     */
    sendResetPasswordMail(to_address, token, expired_at) {
        return __awaiter(this, void 0, void 0, function* () {
            const reset_expired_at = expired_at.toISOString();
            const reset_link = `${Env_1.env.mail.app_url}/auth/confirm`;
            const reset_code = token;
            const body_html = fs_1.default
                .readFileSync(path_1.default.resolve(__dirname, "../../../assets/mail_templates/pw-reset.html"), { encoding: "utf8" })
                .replace("{{reset_link}}", reset_link)
                .replace("{{reset_code}}", reset_code)
                .replace("{{recipient_mail}}", to_address)
                .replace("{{reset_expired_at}}", reset_expired_at)
                .replace("{{copyright_owner}}", "EzLang")
                .replace("{{link_imprint}}", `${Env_1.env.mail.app_url}/imprint`)
                .replace("{{link_privacy}}", `${Env_1.env.mail.app_url}/privacy`);
            const body_txt = fs_1.default
                .readFileSync(path_1.default.resolve(__dirname, "../../../assets/mail_templates/pw-reset.html"), { encoding: "utf8" })
                .replace("{{reset_link}}", reset_link)
                .replace("{{recipient_mail}}", to_address)
                .replace("{{copyright_owner}}", "LfK!")
                .replace("{{link_imprint}}", `${Env_1.env.mail.app_url}/imprint`)
                .replace("{{link_privacy}}", `${Env_1.env.mail.app_url}/privacy`);
            const mail = {
                to: to_address,
                subject: "Password Reset",
                text: body_txt,
                html: body_html,
            };
            yield this.sendMail(mail);
        });
    }
    /**
     * Function for sending a test mail from the test mail template.
     * @param to_address The address the mail will be sent to. Should always get pulled from a user object.
     * @param token The requested password reset token - will be combined with the app_url to generate a password reset link.
     */
    sendRegistrationMail(to_address, token, expired_at) {
        return __awaiter(this, void 0, void 0, function* () {
            const verify_expired_at = expired_at.toISOString();
            const verify_link = `${Env_1.env.mail.app_url}/auth/verify`;
            const verify_code = token;
            const body_html = fs_1.default
                .readFileSync(path_1.default.resolve(__dirname, "../../../assets/mail_templates/account-confirmation.html"), { encoding: "utf8" })
                .replace("{{verify_link}}", verify_link)
                .replace("{{verify_code}}", verify_code)
                .replace("{{verify_expired_at}}", verify_expired_at)
                .replace("{{recipient_mail}}", to_address)
                .replace("{{copyright_owner}}", "EzLearn")
                .replace("{{link_imprint}}", `${Env_1.env.mail.app_url}/imprint`)
                .replace("{{link_privacy}}", `${Env_1.env.mail.app_url}/privacy`);
            const body_txt = fs_1.default
                .readFileSync(path_1.default.resolve(__dirname, "../../../assets/mail_templates/account-confirmation.html"), { encoding: "utf8" })
                .replace("{{verify_link}}", verify_link)
                .replace("{{verify_expired_at}}", verify_expired_at)
                .replace("{{recipient_mail}}", to_address)
                .replace("{{copyright_owner}}", "DigiLearn")
                .replace("{{link_imprint}}", `${Env_1.env.mail.app_url}/imprint`)
                .replace("{{link_privacy}}", `${Env_1.env.mail.app_url}/privacy`);
            const mail = {
                to: to_address,
                subject: "Verify Account",
                text: body_txt,
                html: body_html,
            };
            yield this.sendMail(mail);
        });
    }
    /**
     * Function for sending a test mail from the test mail template.
     * @param to_address The address the test mail will be sent to - this is the configured from-address by default.
     */
    sendTestMail(to_address = Env_1.env.mail.mail_from) {
        return __awaiter(this, void 0, void 0, function* () {
            const body_html = fs_1.default
                .readFileSync(path_1.default.resolve(__dirname, "../../../assets/mail_templates/test.html"), { encoding: "utf8" })
                .replace("{{recipient_mail}}", to_address)
                .replace("{{copyright_owner}}", "LfK!")
                .replace("{{link_imprint}}", `${Env_1.env.mail.app_url}/imprint`)
                .replace("{{link_privacy}}", `${Env_1.env.mail.app_url}/privacy`);
            const body_txt = fs_1.default
                .readFileSync(path_1.default.resolve(__dirname, "../../../assets/mail_templates/test.txt"), { encoding: "utf8" })
                .replace("{{recipient_mail}}", to_address)
                .replace("{{copyright_owner}}", "LfK!")
                .replace("{{link_imprint}}", `${Env_1.env.mail.app_url}/imprint`)
                .replace("{{link_privacy}}", `${Env_1.env.mail.app_url}/privacy`);
            const mail = {
                to: to_address,
                subject: "LfK! Test Mail",
                text: body_txt,
                html: body_html,
            };
            yield this.sendMail(mail);
        });
    }
    /**
     * Wrapper function for sending a mail via this object's transporter.
     * @param mail MailOptions object containing the
     */
    sendMail(mail) {
        return __awaiter(this, void 0, void 0, function* () {
            mail.from = Env_1.env.mail.mail_from;
            yield this.transport.sendMail(mail);
        });
    }
};
Mailer = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [])
], Mailer);
exports.Mailer = Mailer;
//# sourceMappingURL=Mailer.js.map