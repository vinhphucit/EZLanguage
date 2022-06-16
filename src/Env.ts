import {get} from "mongoose";
import path from "path";
import * as pkg from "../package.json";
import * as dotenv from 'dotenv';
import {getOsEnv, normalizePort, toBool, toNumber} from "./base/utils/env";
/**
 * Load .env file or for tests the .env.tests file.
 */

if (!process.env.ENV || process.env.ENV === 'test') {
    dotenv.config({path: path.join(process.cwd(), `${((process.env.ENV === 'test') ? '.test' : '')}.env`)});
}

export const env = {
    app: {
        name: 'EZ-Lang-Auth',
        version: (pkg as any).version,
        host: getOsEnv('HOST'),
        port: getOsEnv('PORT'),
        env: getOsEnv('ENV'),
        rootPath: getOsEnv('ROOT_PATH'),
    },
    subscriber: [path.join(__dirname, '**/subscribers/*Subscriber{.js,.ts}')],
    db: {
        propertyDbUri: getOsEnv('MONGO_DB_URI'),
    },
    cors: {
        whitelist: getOsEnv('CORS_WHITELIST'),
    },
    auth: {        
        accessTokenExpiresIn: toNumber(getOsEnv('AUTH_ACCESS_TOKEN_EXPIRES_IN')),
        refreshTokenExpiresIn: toNumber(getOsEnv('AUTH_REFRESH_TOKEN_EXPIRES_IN')),
        emailVerificationExpiresIn: toNumber(getOsEnv('EMAIL_VERIFICATION_EXPIRES_IN')),
        emailVerificationMaxTryCount: toNumber(getOsEnv('EMAIL_VERIFICATION_MAX_TRY_COUNT')),
        resetPasswordExpiresIn: toNumber(getOsEnv('RESET_PASSWORD_EXPIRES_IN')),
        resetPasswordMaxTryCount: toNumber(getOsEnv('RESET_PASSWORD_MAX_TRY_COUNT')),
        
    },
    mail: {
        mail_server: getOsEnv('MAIL_SERVER'),
        mail_port: toNumber(getOsEnv('MAIL_PORT')),
        mail_user: getOsEnv('MAIL_USER'),
        mail_password: getOsEnv('MAIL_PASSWORD'),
        mail_from: getOsEnv('MAIL_FROM'),
        app_url: getOsEnv('APP_URL'),
    },
}
