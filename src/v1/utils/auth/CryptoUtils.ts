import * as bcrypt from 'bcrypt';

export class CryptoUtils{
    public static hashPassword(password: string): Promise<string> {
        return new Promise((resolve, reject) => {
            bcrypt.hash(password, 10, (err, hash) => {
                if (err) {
                    return reject(err);
                }
                resolve(hash);
            });
        });
    }

    public static comparePassword(userPassword: string, password: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            bcrypt.compare(password, userPassword, (err, res) => {
                resolve(res === true);
            });
        });
    }

}