import { Routes } from '@angular/router';
import { canActivateAuth } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'todos', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/login.page').then((m) => m.LoginPage),
  },
  {
    path: 'todos',
    canActivate: [canActivateAuth],
    loadComponent: () =>
      import('./features/todos/todos.page').then((m) => m.TodosPage),
  },
  {
    path: 'profile',
    canActivate: [canActivateAuth],
    loadComponent: () =>
      import('./features/profile/profile.page').then((m) => m.ProfilePage),
  },
  { path: '**', redirectTo: 'todos' },
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/login.page').then((m) => m.LoginPage),
  },
  {
    path: 'todos',
    loadComponent: () =>
      import('./features/todos/todos.page').then((m) => m.TodosPage),
  },
];
