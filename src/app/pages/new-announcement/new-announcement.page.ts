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
  IonToggle,
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
    IonToggle,
  ],
})
export class NewAnnouncementPage {
  private router = inject(Router);
  private service = inject(AnnouncementsService);

  form = {
    type: 'richiesta' as 'richiesta' | 'offerta',
    title: '',
    subtitle: '',
    description: '',
    category: '',
    duration_hours: 1,
    total_spots: 1,
    credits: 10,
    event_date: null as string | null,
    event_time: null as string | null,
    is_lastminute: false,
  };

  loading = false;
  error = '';
  success = false;

  private resetForm() {
    this.form = {
      type: 'richiesta' as 'richiesta' | 'offerta',
      title: '',
      subtitle: '',
      description: '',
      category: '',
      duration_hours: 1,
      total_spots: 1,
      credits: 10,
      event_date: null,
      event_time: null,
      is_lastminute: false,
    };

    this.error = '';
    // this.success = false;
  }

  submit() {
    this.loading = true;
    this.error = '';

    const payload = {
      ...this.form,
      event_date: this.form.event_date
        ? this.form.event_date.split('T')[0]
        : null,
      event_time: this.form.event_time
        ? this.form.event_time.split('T')[1]?.substring(0, 8)
        : null,
    };

    this.service.createAnnouncement(payload).subscribe({
      next: () => {
        this.loading = false;
        this.success = true;

        this.resetForm();

        setTimeout(() => {
          this.router.navigateByUrl('/annunci');
        }, 800);
      },
      error: (err) => {
        this.loading = false;
        this.error = 'Errore durante il salvataggio';
        console.error(err);
      },
    });
  }

  goToAnnunci() {
    this.router.navigateByUrl('/annunci');
  }
}
