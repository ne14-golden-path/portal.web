import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('../home/home.component').then(c => c.HomeComponent)
  },
  {
    path: 'documents',
    loadComponent: () => import('../documents/documents.component').then(c => c.DocumentsComponent)
  },
  {
    path: 'weather',
    loadComponent: () => import('../weather/weather.component').then(c => c.WeatherComponent)
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];
