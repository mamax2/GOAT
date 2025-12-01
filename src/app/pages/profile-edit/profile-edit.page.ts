import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonInput,
  IonTextarea,
  IonButton,
  IonLabel,
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { AuthService, AuthUser } from 'src/app/core/services/auth-service';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.page.html',
  styleUrls: ['./profile-edit.page.scss'],
  standalone: true,
  imports: [
    IonLabel,
    CommonModule,
    FormsModule,
    IonContent,
    IonHeader,
    IonInput,
    IonTextarea,
    IonButton,
  ],
})
export class ProfileEditPage {
  private auth = inject(AuthService);
  private router = inject(Router);

  user!: AuthUser;

  name = '';
  main_subject = '';
  avatar_url = '';

  async ngOnInit() {
    const res = await this.auth.me();
    this.user = res.user;

    this.name = this.user.name;
    this.main_subject = this.user.main_subject || '';
    this.avatar_url = this.user.avatar_url || '';
  }

  async save() {
    try {
      await this.auth.updateProfile({
        name: this.name,
        main_subject: this.main_subject,
        avatar_url: this.avatar_url,
      });

      this.router.navigateByUrl('/profile', { replaceUrl: true });
    } catch (err) {
      console.error(err);
      alert('Errore aggiornando il profilo');
    }
  }

  cancel() {
    this.router.navigateByUrl('/profile');
  }
}
