import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideStore, provideState } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { routes } from './app.routes';
import { provideSpaConfig } from '../config/spa-config.provider';
import { AppEffects } from '../store/app.effects';
import { appReducer } from '../store/app.reducer';
import { httpNoticeInterceptor } from '../notices/http-notices.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideStore(),
    provideStoreDevtools(),
    provideState('app', appReducer),
    provideEffects([AppEffects]),
    provideRouter(routes),
    provideHttpClient(
      withInterceptorsFromDi(),
      withInterceptors([httpNoticeInterceptor])),
    provideSpaConfig(),
  ],
};
