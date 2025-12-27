import { Component, inject } from '@angular/core';
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
  selector: 'app-signup',
  imports: [
    IonChip,
    FormsModule,
    IonContent,
    IonHeader,
    IonItem,
    IonInput,
    IonList,
    IonLabel,
  ],
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage {
  private auth = inject(AuthService);
  private router = inject(Router);

  name = '';
  email = '';
  pass = '';
  loading = false;
  error = '';

  async doSignup() {
    this.error = '';

    const name = (this.name ?? '').trim();
    const email = (this.email ?? '').trim().toLowerCase();
    const pass = this.pass ?? '';

    if (!name || !email || pass.length < 8) {
      this.error = 'Compila tutti i campi (password ≥ 8).';
      return;
    }

    this.loading = true;
    try {
      await this.auth.signup(name, email, pass);
      await this.auth.login(email, pass);
      await this.router.navigateByUrl('/home', { replaceUrl: true });
    } catch (e: any) {
      console.log('Signup error:', e);

      if (e?.status === 422 && e?.error?.errors) {
        const messages = Object.values(e.error.errors) as string[];
        this.error = messages.join(' • ');
      } else if (e?.status === 409) {
        this.error = e?.error?.error || 'Email già registrata.';
      } else {
        this.error =
          e?.error?.error || e?.error?.message || 'Registrazione fallita';
      }
    } finally {
      this.loading = false;
    }
  }

  goLogin() {
    this.router.navigateByUrl('/login');
  }
}
