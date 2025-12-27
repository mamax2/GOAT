import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonHeader, IonContent, IonButton } from '@ionic/angular/standalone';

import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth-service';
import { AnnouncementsService } from 'src/app/core/services/announcements-service';
import { Announcement } from 'src/app/core/models/announcement.model';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [CommonModule, FormsModule, IonHeader, IonContent, IonButton],
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  private auth = inject(AuthService);
  private router = inject(Router);

  private announcementsService = inject(AnnouncementsService);

  title = '';

  // ANNUNCI
  activeTab: 'richiesta' | 'offerta' | 'lastminute' = 'richiesta';
  announcements: Announcement[] = [];
  loading = true;

  constructor() {}

  ngOnInit() {
    this.loadAnnouncements();
  }

  async doLogout() {
    try {
      await this.auth.logout();
      await this.router.navigateByUrl('/login', { replaceUrl: true });
    } catch (err) {
      console.error('Logout fallito', err);
    }
  }

  isUrgent(a: Announcement): boolean {
    if (!a.expires_at) return false;

    const today = new Date().toISOString().slice(0, 10);
    return a.expires_at.startsWith(today);
  }

  goToProfile() {
    this.router.navigateByUrl('/profile');
  }

  goToAnnouncement() {
    this.router.navigateByUrl('/new-announcement');
  }

  changeTab(tab: 'richiesta' | 'offerta' | 'lastminute') {
    this.activeTab = tab;
    this.loadAnnouncements();
  }

  loadAnnouncements() {
    this.loading = true;
    this.announcementsService
      .getAnnouncements(this.activeTab)
      .subscribe((res) => {
        this.announcements = res.data;
        this.loading = false;
      });
  }

  onCtaClick(a: Announcement) {
    this.announcementsService.joinAnnouncement(a.id).subscribe({
      next: () => {
        a.remaining_spots--;

        alert('Operazione riuscita');
      },
      error: (err) => {
        alert(err?.error?.error || 'Errore durante l’operazione');
      },
    });
  }
}
