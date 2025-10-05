import { Component, inject, signal } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonAvatar,
  IonImg,
} from '@ionic/angular/standalone';
import { AuthService } from 'src/app/core/services/auth-service';
import { StorageService } from 'src/app/core/services/storage-service';

@Component({
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    IonAvatar,
    IonImg,
  ],
  template: `
    <ion-header
      ><ion-toolbar color="primary"
        ><ion-title>Profile</ion-title></ion-toolbar
      ></ion-header
    >
    <ion-content class="ion-padding">
      <div class="ion-text-center ion-margin">
        <ion-avatar
          *ngIf="avatarUrl()"
          style="margin:auto; width:120px; height:120px;"
        >
          <ion-img [src]="avatarUrl()"></ion-img>
        </ion-avatar>
      </div>

      <input type="file" accept="image/*" (change)="onFile($event)" />
      <ion-button expand="block" color="medium" (click)="logout()"
        >Logout</ion-button
      >
    </ion-content>
  `,
})
export class ProfilePage {
  private auth = inject(AuthService);
  private storage = inject(StorageService);
  avatarUrl = signal<string | null>(null);

  async onFile(e: Event) {
    const input = e.target as HTMLInputElement;
    if (!input.files?.[0]) return;
    const user = this.auth.currentUser;
    if (!user) return;
    const url = await this.storage.uploadAvatar(user.uid, input.files[0]);
    this.avatarUrl.set(url);
  }
  logout() {
    this.auth.logout();
  }
}
