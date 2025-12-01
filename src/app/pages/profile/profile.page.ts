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
  userName = '';
  userRole = '';
  mainSubject = '';
  level = 1;
  nextLevel = 2;
  goatCoins = 0;
  lessonsAsTutor = 0;
  lessonsAsStudent = 0;
  avatarUrl = '';

  constructor(private router: Router) {}

  ngOnInit() {
    this.loadProfile();
  }

  async loadProfile() {
    try {
      const res = await this.auth.me(); // ritorna { user: AuthUser }
      const u = res.user;

      if (!u) {
        this.router.navigateByUrl('/login', { replaceUrl: true });
        return;
      }

      this.userName = u.name;
      this.userRole = this.mapRole(u.user_role);
      this.mainSubject = u.main_subject || '—';
      this.level = u.level;
      this.nextLevel = u.level + 1;
      this.goatCoins = u.goat_coins;
      this.lessonsAsTutor = u.lessons_as_tutor;
      this.lessonsAsStudent = u.lessons_as_student;
      this.avatarUrl = u.avatar_url || this.avatarUrl;
    } catch (err) {
      console.error('Errore caricando il profilo:', err);
      this.router.navigateByUrl('/login', { replaceUrl: true });
    }
  }

  mapRole(role: string): string {
    if (role === 'tutor') return 'Tutor';
    if (role === 'both') return 'Tutor & Studente';
    if (role === 'admin') return 'Admin';
    return 'Studente';
  }

  get levelLabel(): string {
    if (this.level >= 10) return 'Legendary GOAT';
    if (this.level >= 7) return 'Pro GOAT';
    if (this.level >= 4) return 'Rising GOAT';
    return 'New GOAT';
  }

  goToHome() {
    this.router.navigateByUrl('/home');
  }

  editProfile() {
    this.router.navigateByUrl('/profile-edit');
  }

  async doLogout() {
    try {
      await this.auth.logout();
      await this.router.navigateByUrl('/login', { replaceUrl: true });
    } catch (err) {
      console.error('Logout fallito', err);
    }
  }
}
