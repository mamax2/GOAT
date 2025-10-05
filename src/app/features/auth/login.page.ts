import { Component, inject } from '@angular/core';
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
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth-service';

@Component({
  standalone: true,
  imports: [
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
  template: `
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>Login</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <ion-list>
        <ion-item>
          <ion-label position="stacked">Email</ion-label>
          <ion-input type="email" [(ngModel)]="email"></ion-input>
        </ion-item>

        <ion-item>
          <ion-label position="stacked">Password</ion-label>
          <ion-input type="password" [(ngModel)]="pass"></ion-input>
        </ion-item>

        <ion-button expand="block" (click)="doLogin()">Login</ion-button>
        <ion-button expand="block" fill="outline" (click)="doSignup()"
          >Signup</ion-button
        >
        <ion-button expand="block" color="tertiary" (click)="google()"
          >Continua con Google</ion-button
        >
      </ion-list>
    </ion-content>
  `,
})
export class LoginPage {
  private auth = inject(AuthService);
  private router = inject(Router);

  email = '';
  pass = '';

  async doLogin() {
    await this.auth.login(this.email, this.pass);
    this.router.navigateByUrl('/todos');
  }
  async doSignup() {
    await this.auth.signup(this.email, this.pass);
    this.router.navigateByUrl('/todos');
  }
  async google() {
    await this.auth.loginWithGoogle();
    this.router.navigateByUrl('/todos');
  }
}
