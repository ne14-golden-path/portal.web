export class SpaConfig {

  /** The root url of the api. */
  readonly apiUrl: string;

  /** The spa application (client) id. */
  readonly b2cClientId: string;

  /** The id of the sign-in user flow. */
  readonly b2cSignInId: string;

  /** The tenant subdomain. */
  readonly b2cTenantSubdomain: string;

  /** Extensions supported for pdf conversion. */
  readonly extensionsForPdf: string;

  constructor() {
    const env = (window as any).__env;
    this.apiUrl = env.apiUrl;
    this.b2cClientId = env.b2cClientId;
    this.b2cSignInId = env.b2cSignInId;
    this.b2cTenantSubdomain = env.b2cTenantSubdomain;
    this.extensionsForPdf = env.extensionsForPdf;
  }
}