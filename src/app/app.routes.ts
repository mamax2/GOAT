import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/login/login.page').then((m) => m.LoginPage),
  },
  {
    path: 'home',
    canActivate: [
      () => import('./core/guards/auth.guard').then((g) => g.canActivateAuth),
    ],
    loadComponent: () =>
      import('./features/home/home.page').then((m) => m.HomePage),
  },
  { path: '**', redirectTo: 'home' },
];
