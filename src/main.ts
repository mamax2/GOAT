import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { environment } from './environments/environment';

import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth, connectAuthEmulator } from '@angular/fire/auth';
import {
  initializeFirestore,
  provideFirestore,
  connectFirestoreEmulator,
} from '@angular/fire/firestore';
import {
  persistentLocalCache,
  persistentMultipleTabManager,
} from 'firebase/firestore';
import {
  getStorage,
  provideStorage,
  connectStorageEmulator,
} from '@angular/fire/storage';
import { getApp } from 'firebase/app';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(
      routes,
      withInMemoryScrolling({ scrollPositionRestoration: 'enabled' })
    ),

    provideFirebaseApp(() => initializeApp(environment.firebase)),

    // Firestore con cache offline persistente
    provideFirestore(() =>
      initializeFirestore(getApp(), {
        localCache: persistentLocalCache({
          tabManager: persistentMultipleTabManager(),
        }),
      })
    ),

    provideAuth(() => getAuth()),
    provideStorage(() => getStorage()),
  ],
}).then(async () => {
  // Collegamento Emulatori SOLO in dev
  if (!environment.production) {
    try {
      connectAuthEmulator(getAuth(), 'http://localhost:9099');
      connectFirestoreEmulator(
        (window as any).ngInject?.getFirestore?.() ||
          (await import('@angular/fire/firestore')).getFirestore(),
        'localhost',
        8080
      );
      connectStorageEmulator(getStorage(), 'localhost', 9199);
    } catch (e) {
      // silenzioso se emulatori non attivi
      console.info('Emulatori non collegati (ok in prod).');
    }
  }
});
