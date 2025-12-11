import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  IonHeader,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  IonTextarea,
  IonSelect,
  IonSelectOption,
  IonButton,
  IonDatetime,
} from '@ionic/angular/standalone';

import { Router } from '@angular/router';
import { AnnouncementsService } from 'src/app/core/services/announcements-service';

@Component({
  standalone: true,
  selector: 'app-new-announcement',
  templateUrl: './new-announcement.page.html',
  styleUrls: ['./new-announcement.page.scss'],
  imports: [
    CommonModule,
    FormsModule,
    IonHeader,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    IonInput,
    IonTextarea,
    IonSelect,
    IonSelectOption,
    IonButton,
    IonDatetime,
  ],
})
export class NewAnnouncementPage {
  private router = inject(Router);
  private service = inject(AnnouncementsService);

  form: any = {
    type: 'request',
    title: '',
    subtitle: '',
    description: '',
    category: '',
    icon: '',
    duration_hours: 1,
    total_spots: 1,
    remaining_spots: 1,
    credits: 10,
    event_date: null,
    event_time: null,
    cta_label: '',
    cta_action: '',
  };

  loading = false;
  error = '';
  success = false;

  submit() {
    this.loading = true;
    this.error = '';

    this.service.createAnnouncement(this.form).subscribe({
      next: () => {
        this.loading = false;
        this.success = true;
        // Torna alla home dopo 1 secondo
        setTimeout(() => {
          this.router.navigateByUrl('/home');
        }, 1000);
      },
      error: (err) => {
        this.loading = false;
        this.error = 'Errore durante il salvataggio.';
        console.error(err);
      },
    });
  }
  goToHome() {
    this.router.navigateByUrl('/home');
  }
}
