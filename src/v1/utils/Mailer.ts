import fs from "fs";
import nodemailer from "nodemailer";
import { MailOptions } from "nodemailer/lib/json-transport";
import Mail from "nodemailer/lib/mailer";
import path from "path";
import { Logger } from "../../base/utils/Logger";
import { Service } from "typedi";
import { InternalServerException } from "../../base/exceptions/InternalServerException";
import { env } from "../../Env";

/**
 * This class is responsible for all things mail sending.
 * This uses the mail emplates from src/static/mail_templates
 */
@Service()
export class Mailer {
  private transport: Mail;

  /**
   * The class's default constructor.
   * Creates the transporter and tests the connection.
   */
  constructor() {
    this.transport = nodemailer.createTransport({
      host: env.mail.mail_server,
      port: env.mail.mail_port,
      auth: {
        user: env.mail.mail_user,
        pass: env.mail.mail_password,
      },
    });

    this.transport.verify(function (error, success) {
      if (error) {
        Logger.info(error.message)
        // throw new InternalServerException(error.message);
      }
    });
  }

  /**
   * Function for sending a test mail from the test mail template.
   * @param to_address The address the mail will be sent to. Should always get pulled from a user object.
   * @param token The requested password reset token - will be combined with the app_url to generate a password reset link.
   */
  public async sendResetPasswordMail(to_address: string, token: string, expired_at: Date) {
    const reset_expired_at = expired_at.toISOString();
    const reset_link = `${env.mail.app_url}/auth/confirm`;
    const reset_code = token;
    const body_html = fs
      .readFileSync(
        path.resolve(__dirname, "../../../assets/mail_templates/pw-reset.html"),
        { encoding: "utf8" }
      )
      .replace("{{reset_link}}", reset_link)
      .replace("{{reset_code}}", reset_code)
      .replace("{{recipient_mail}}", to_address)
      .replace("{{reset_expired_at}}", reset_expired_at)
      .replace("{{copyright_owner}}", "EzLang")
      .replace("{{link_imprint}}", `${env.mail.app_url}/imprint`)
      .replace("{{link_privacy}}", `${env.mail.app_url}/privacy`);

    const mail: MailOptions = {
      to: to_address,
      subject: "Password Reset",      
      html: body_html,
    };
    await this.sendMail(mail);
  }

  /**
   * Function for sending a test mail from the test mail template.
   * @param to_address The address the mail will be sent to. Should always get pulled from a user object.
   * @param token The requested password reset token - will be combined with the app_url to generate a password reset link.
   */
  public async sendRegistrationMail(
    to_address: string,
    token: string,
    expired_at: Date
  ) {
    const verify_expired_at = expired_at.toISOString();
    const verify_link = `${env.mail.app_url}/auth/verify`;
    const verify_code = token;
    const body_html = fs
      .readFileSync(
        path.resolve(
          __dirname,
          "../../../assets/mail_templates/account-confirmation.html"
        ),
        { encoding: "utf8" }
      )
      .replace("{{verify_link}}", verify_link)
      .replace("{{verify_code}}", verify_code)
      .replace("{{verify_expired_at}}", verify_expired_at)
      .replace("{{recipient_mail}}", to_address)
      .replace("{{copyright_owner}}", "EzLearn")
      .replace("{{link_imprint}}", `${env.mail.app_url}/imprint`)
      .replace("{{link_privacy}}", `${env.mail.app_url}/privacy`);


    const mail: MailOptions = {
      to: to_address,
      subject: "Verify Account",
      html: body_html,
    };
    await this.sendMail(mail);
  }

  /**
   * Function for sending a test mail from the test mail template.
   * @param to_address The address the test mail will be sent to - this is the configured from-address by default.
   */
  public async sendTestMail(to_address: string = env.mail.mail_from) {
    const body_html = fs
      .readFileSync(
        path.resolve(__dirname, "../../../assets/mail_templates/test.html"),
        { encoding: "utf8" }
      )
      .replace("{{recipient_mail}}", to_address)
      .replace("{{copyright_owner}}", "LfK!")
      .replace("{{link_imprint}}", `${env.mail.app_url}/imprint`)
      .replace("{{link_privacy}}", `${env.mail.app_url}/privacy`);

    const mail: MailOptions = {
      to: to_address,
      subject: "EzLearn! Test Mail",

      html: body_html,
    };
    await this.sendMail(mail);
  }

  /**
   * Wrapper function for sending a mail via this object's transporter.
   * @param mail MailOptions object containing the
   */
  public async sendMail(mail: MailOptions) {
    mail.from = env.mail.mail_from;
    await this.transport.sendMail(mail);
  }
}
