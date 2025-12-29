import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/auth/login/login.page').then((m) => m.LoginPage),
  },
  {
    path: 'home',
    canActivate: [
      () => import('./core/guards/auth.guard').then((g) => g.canActivateAuth),
    ],
    loadComponent: () =>
      import('./pages/home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'signup',
    loadComponent: () =>
      import('./pages/auth/signup/signup.page').then((m) => m.SignupPage),
  },
  {
    path: 'profile',
    loadComponent: () =>
      import('./pages/profile/profile.page').then((m) => m.ProfilePage),
  },
  {
    path: 'profile-edit',
    loadComponent: () =>
      import('./pages/profile-edit/profile-edit.page').then(
        (m) => m.ProfileEditPage
      ),
  },
  {
    path: 'new-announcement',
    loadComponent: () =>
      import('./pages/new-announcement/new-announcement.page').then(
        (m) => m.NewAnnouncementPage
      ),
  },
  {
    path: 'wallet',
    loadComponent: () =>
      import('./pages/wallet/wallet.page').then((m) => m.WalletPage),
  },
  {
    path: 'annunci',
    loadComponent: () =>
      import('./pages/annunci/annunci.page').then((m) => m.AnnunciPage),
  },
  {
    path: 'match',
    loadComponent: () =>
      import('./pages/match/match.page').then((m) => m.MatchPage),
  },
  {
    path: 'edit-announcement/:id',
    loadComponent: () =>
      import('./pages/edit-announcement/edit-announcement.page').then(
        (m) => m.EditAnnouncementPage
      ),
  },
];
