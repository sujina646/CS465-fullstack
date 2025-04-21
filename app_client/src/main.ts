import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter, Routes } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { AppModule } from './app/app.module';
import { authInterceptor } from './app/interceptors/auth.interceptor';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'trips',
    pathMatch: 'full'
  },
  {
    path: 'trips',
    loadComponent: () => import('./app/components/trip-list/trip-list.component').then(m => m.TripListComponent)
  },
  {
    path: 'login',
    loadComponent: () => import('./app/components/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'admin',
    loadComponent: () => import('./app/components/admin/admin.component').then(m => m.AdminComponent),
    canMatch: [() => import('./app/guards/auth.guard').then(m => m.AuthGuard)]
  },
  {
    path: '**',
    redirectTo: 'trips'
  }
];

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
    importProvidersFrom(AppModule)
  ]
}).catch(err => console.error(err));
