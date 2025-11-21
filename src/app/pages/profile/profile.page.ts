import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonAvatar,
  IonChip,
  IonIcon,
  IonLabel,
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth-service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [
    IonLabel,
    CommonModule,
    FormsModule,
    IonContent,
    IonHeader,
    IonCard,
    IonCardHeader,
    IonCardContent,
    IonAvatar,
    IonChip,
  ],
})
export class ProfilePage {
  private auth = inject(AuthService);

  /* Accordion state */
  acc1 = false;
  acc2 = false;

  /* User data */
  userName = 'Mario Rossi';
  userRole = 'Tutor & Studente';
  mainSubject = 'Matematica • Fisica';
  level = 4;
  goatCoins = 32;
  nextLevel = 5;
  lessonsAsTutor = 18;
  lessonsAsStudent = 12;

  constructor(private router: Router) {}

  goToHome() {
    this.router.navigateByUrl('/home');
  }

  get levelLabel(): string {
    if (this.level >= 10) return 'Legendary GOAT';
    if (this.level >= 7) return 'Pro GOAT';
    if (this.level >= 4) return 'Rising GOAT';
    return 'New GOAT';
  }

  async doLogout() {
    try {
      await this.auth.logout(); // POST /api/logout.php { withCredentials: true }
      await this.router.navigateByUrl('/login', { replaceUrl: true });
    } catch (err) {
      console.error('Logout fallito', err);
    }
  }
}
