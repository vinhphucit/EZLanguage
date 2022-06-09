import fs from "fs";
import * as jsonwebtoken from "jsonwebtoken";
import path from "path";
import { JwtUser } from "../../models/domain/JwtUser";
import { JwtPayload } from "../../models/domain/JwtPayload";
import { env } from "../../../Env";
import { IUser } from "../../models/dao/User";

/**
 * This class is responsible for all things JJWT creation.
 */
export class JwtUtils {
  public static privateKey = fs.readFileSync(
    path.resolve(__dirname, "../../../../assets/private.key"),
    "utf8"
  );
  public static publicKey = fs.readFileSync(
    path.resolve(__dirname, "../../../../assets/public.key"),
    "utf8"
  );
  /**
   * Creates a new refresh token for a given user
   * @param user User entity that the refresh token shall be created for
   * @param expiry_timestamp Timestamp for the token expiry. Will be generated if not provided.
   */
  public static createRefreshToken(user: IUser, refreshTokenId: string, expiry_timestamp?: number): string {
    let signOptions: jsonwebtoken.SignOptions = {
      algorithm: "RS256",
    };
    return jsonwebtoken.sign(
      {
        userId: user.id,
        refreshTokenId,
        exp: expiry_timestamp,
      },
      this.privateKey,
      signOptions
    );
  }

  /**
   * Creates a new access token for a given user
   * @param user User entity that the access token shall be created for
   * @param expiryDate Timestamp for the token expiry. Will be generated if not provided.
   */
  public static createAccess(user: IUser, expiryDate?: number): string {
    let jwtPayload = new JwtPayload(user);

    let signOptions: jsonwebtoken.SignOptions = {
      algorithm: "RS256",
    };
    const accessToken = jsonwebtoken.sign(
      {
        ...jwtPayload,
        exp: expiryDate,
      },
      this.privateKey,
      signOptions
    );

    return accessToken;
  }

  /**
   * Creates a new password reset token for a given user.
   * The token is valid for 15 minutes or 1 use - whatever comes first.
   * @param user User entity that the password reset token shall be created for
   */
  public static createReset(user: IUser, expiry_timestamp: number): string {
    let signOptions: jsonwebtoken.SignOptions = {
      algorithm: "RS256",
    };
    return jsonwebtoken.sign(
      {
        id: user.id,
        exp: expiry_timestamp,
      },
      this.privateKey,
      signOptions
    );
  }

  /**
   * Creates a registerToken for registration.
   * @param  User entity contains email and password only
   */
  // public static createRegisterToken(email: string, password: string, expiredIn: Date): string {
  //     const user = new UserDomain();
  //     user.email = email;
  //     user.password = password;
  //     let expiry_timestamp = Math.floor(expiredIn.getTime() / 1000)
  //     return jsonwebtoken.sign({
  //         user: user.id,
  //         exp: expiry_timestamp
  //     }, this.privateKey);
  // }

  public static async verifyJwtToken(token: string): Promise<any> {
    return new Promise((resolve, reject) => {
      jsonwebtoken.verify(
        token,
        JwtUtils.publicKey,
        { algorithms: ["RS256"] },
        (err, data) => {
          if (err) {
            return reject(err);
          }
          return resolve(data);
        }
      );
    });
  }
}
