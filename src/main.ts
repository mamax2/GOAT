import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideIonicAngular } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  homeOutline,
  walletOutline,
  documentOutline,
  peopleOutline,
} from 'ionicons/icons';

import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { authInterceptor } from './app/core/interceptors/auth.interceptor';

// Register commonly used icons (tab bar + cards) so IonIcon can resolve them
addIcons({ homeOutline, walletOutline, documentOutline, peopleOutline });

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideIonicAngular(), // registers Ionic providers, gestures, overlays, etc.
    provideAnimations(),
  ],
});
