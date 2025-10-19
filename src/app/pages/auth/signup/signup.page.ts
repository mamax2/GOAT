import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonItem,
  IonInput,
  IonButton,
  IonList,
  IonLabel,
  IonButtons,
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
    IonTitle,
    IonToolbar,
    IonItem,
    IonInput,
    IonButton,
    IonList,
    IonLabel,
    IonButtons,
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
    if (!this.name.trim() || !this.email.trim() || this.pass.length < 6) {
      this.error = 'Compila tutti i campi (password ≥ 6).';
      return;
    }
    try {
      this.loading = true;
      await this.auth.signup(this.name.trim(), this.email.trim(), this.pass);
      this.router.navigateByUrl('/home');
    } catch (e: any) {
      this.error = e?.error?.error || 'Registrazione fallita';
    } finally {
      this.loading = false;
    }
  }

  goLogin() {
    this.router.navigateByUrl('/login');
  }
}
