import { BrowserCacheLocation, InteractionType, IPublicClientApplication, LogLevel, PublicClientApplication } from '@azure/msal-browser';
import { MsalGuardConfiguration, MsalInterceptorConfiguration } from '@azure/msal-angular';

import { SpaConfig } from './spa-config.model';

export function loggerCallback(logLevel: LogLevel, message: string) {
  if (logLevel == LogLevel.Error) console.error(message);
  else if (logLevel == LogLevel.Warning) console.warn(message);
}

export function MSALInstanceFactory(env: SpaConfig): IPublicClientApplication {
  return new PublicClientApplication({
    auth: {
      clientId: env.b2cClientId,
      authority: `https://${env.b2cTenantSubdomain}.b2clogin.com/${env.b2cTenantSubdomain}.onmicrosoft.com/${env.b2cSignInId}`,
      redirectUri: '/',
      postLogoutRedirectUri: '/',
      knownAuthorities: [`${env.b2cTenantSubdomain}.b2clogin.com`]
    },
    cache: {
      cacheLocation: BrowserCacheLocation.LocalStorage
    },
    system: {
      allowNativeBroker: false, // Disables WAM Broker
      loggerOptions: {
        loggerCallback,
        logLevel: LogLevel.Verbose,
        piiLoggingEnabled: false
      }
    }
  });
}

export function MSALInterceptorConfigFactory(env: SpaConfig): MsalInterceptorConfiguration {  
  const protectedResourceMap = new Map<string, Array<string>>();
  protectedResourceMap.set(env.apiUrl, [`https://${env.b2cTenantSubdomain}.onmicrosoft.com/webapp/api`]);
  return {
    interactionType: InteractionType.Redirect,
    protectedResourceMap
  };
}

export function MSALGuardConfigFactory(env: SpaConfig): MsalGuardConfiguration {
  return {
    interactionType: InteractionType.Redirect,
    loginFailedRoute: '/login-failed',
    authRequest: {
      scopes: [`https://${env.b2cTenantSubdomain}.onmicrosoft.com/webapp/api`],
    },
  };
}