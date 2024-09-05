import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { EnvironmentProviders, makeEnvironmentProviders } from "@angular/core";
import { MsalInterceptor, MSAL_INSTANCE, MSAL_GUARD_CONFIG, MSAL_INTERCEPTOR_CONFIG, MsalService, MsalGuard, MsalBroadcastService } from "@azure/msal-angular";

import { MSALInstanceFactory, MSALGuardConfigFactory, MSALInterceptorConfigFactory } from "./msal.factory";
import { SpaConfig } from "./spa-config.model";

export function provideSpaConfig(): EnvironmentProviders {
  return makeEnvironmentProviders([
    SpaConfig,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true,
    },
    {
      provide: MSAL_INSTANCE,
      useFactory: MSALInstanceFactory,
      deps: [SpaConfig],
    },
    {
      provide: MSAL_GUARD_CONFIG,
      useFactory: MSALGuardConfigFactory,
      deps: [SpaConfig],
    },
    {
      provide: MSAL_INTERCEPTOR_CONFIG,
      useFactory: MSALInterceptorConfigFactory,
      deps: [SpaConfig],
    },
    MsalService,
    MsalGuard,
    MsalBroadcastService,
  ]);
}