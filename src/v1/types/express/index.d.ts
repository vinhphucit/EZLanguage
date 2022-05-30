declare namespace Express {
  export interface Request {
    payload: JwtPayload;
    currentPmsProperty: CurrentPmsProperty;
  }
}

declare interface CurrentPmsProperty {
  id: string;
  name: string;
  description: string;
  timezone: string;
  active?: boolean;
  apiKey?: string;
}

declare interface JwtPayload {
  /**
   * jwt aud property
   */
  aud: string[] | string;

  /**
   * issuer
   */
  iss: string;

  /**
   * Scope
   */
  scope: string;

  /**
   * Account Id (for guest jwt);
   */
  tenant_id: string;

  /**
   * User id or Guest Id
   */
  sub: string;

  /**
   * Account Id
   */
  acc: string;

  /**
   * Roles
   */
  role: string;

  /**
   * Permissions
   */
  permissions: string;

  /**
   * Spaces
   */
  spaces: string[];

  /**
   * Time issued (miliseconds)
   */
  iat: number;

  /**
   * Time expired (miliseconds)
   */
  exp: number;
}
