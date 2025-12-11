import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonIcon,
  IonCard,
  IonTabBar,
  IonTabButton,
  IonFooter,
  IonRouterLinkWithHref,
} from '@ionic/angular/standalone';

import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth-service';
import { AnnouncementsService } from 'src/app/core/services/announcements-service';
import { Announcement } from 'src/app/core/models/announcement.model';

// SERVIZIO ANNUNCI

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [
    IonFooter,
    IonTabButton,
    IonTabBar,
    IonCard,
    IonIcon,
    CommonModule,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    IonRouterLinkWithHref,
  ],
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
}
