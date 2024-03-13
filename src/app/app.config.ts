import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { EnvServiceProvider } from './features/shared/env.service';
import { FileManagerService } from './features/files/services/file-manager.service';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    EnvServiceProvider,
    FileManagerService,
  ],
};
