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
} from '@ionic/angular/standalone';
import { AuthService } from 'src/app/core/services/auth-service';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [
    IonButtons,
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
  ],
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  private auth = inject(AuthService);
  private router = inject(Router);

  email = '';
  pass = '';

  async doLogin() {
    await this.auth.login(this.email, this.pass);
    this.router.navigateByUrl('/home');
  }
  async doSignup() {
    await this.auth.signup(this.email, this.pass);
    this.router.navigateByUrl('/home');
  }
}
