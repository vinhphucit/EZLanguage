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
        confirmationTokenExpiresIn: toNumber(getOsEnv('AUTH_CONFIRM_EXPIRES_IN')),
        accessTokenExpiresIn: toNumber(getOsEnv('AUTH_ACCESS_TOKEN_EXPIRES_IN')),
        refreshTokenExpiresIn: toNumber(getOsEnv('AUTH_REFRESH_TOKEN_EXPIRES_IN')),
        forgetPasswordTokenExpiresIn: toNumber(getOsEnv('FORGET_PASSWORD_TOKEN_EXPIRES_IN')),
        
    }
}
