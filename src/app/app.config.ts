import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { EnvServiceProvider } from './features/shared/env.service';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), EnvServiceProvider]
};
