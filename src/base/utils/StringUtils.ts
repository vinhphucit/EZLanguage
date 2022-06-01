import moment from "moment";
export const UTC_TIMEZONE = 'Etc/UTC';
export const DATETIME_FORMAT_NO_TZ: string = 'YYYY-MM-DDTHH:mm:ss';
export const DATETIME_FORMAT_ISO: string = 'YYYY-MM-DDTHH:mm:ss.SSS[Z]';
export const DATETIME_FORMAT_BASIC: string = 'YYYY-MM-DD';
export const ALT_EMAIL_DOMAIN: string = '@test.altitudehq.com';

export function genRandomString(length: number) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}

export function switchNull(val1: any, val2: any): any {
    return val1 ? val1 : val2;
}

export function toAltEmailDomain(email: string) {
    if (!email) return email;

    return email.split('@')[0] + ALT_EMAIL_DOMAIN;
}

export function getRandomInt(max: number, min: number = 0) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
