import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import {
  IonContent,
  IonHeader,
  IonTitle,
  IonItem,
  IonInput,
  IonList,
  IonLabel,
  IonChip,
} from '@ionic/angular/standalone';
import { AuthService } from 'src/app/core/services/auth-service';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [
    IonChip,
    FormsModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonItem,
    IonInput,

    IonList,
    IonLabel,
  ],
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  private auth = inject(AuthService);
  private router = inject(Router);

  email = '';
  pass = '';

  loading = signal(false);
  errorMsg = signal<string | null>(null);

  async doLogin() {
    this.errorMsg.set(null);

    if (!this.email || !this.pass) {
      this.errorMsg.set('Inserisci email e password.');
      return;
    }

    this.loading.set(true);
    try {
      await this.auth.login(this.email.trim().toLowerCase(), this.pass);

      await this.router.navigateByUrl('/home');
    } catch (err: any) {
      const msg =
        err?.error?.error ||
        err?.error?.message ||
        err?.message ||
        'Login fallito. Riprova.';
      this.errorMsg.set(msg);
    } finally {
      this.loading.set(false);
    }
  }

  goToSignup() {
    this.router.navigateByUrl('/signup');
  }
}
