import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { AnnouncementsService } from 'src/app/core/services/announcements-service';

@Component({
  standalone: true,
  selector: 'app-edit-announcement',
  imports: [IonicModule, CommonModule, FormsModule],
  templateUrl: './edit-announcement.page.html',
  styleUrls: ['./edit-announcement.page.scss'],
})
export class EditAnnouncementPage implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private service = inject(AnnouncementsService);

  loading = true;
  saving = false;

  announcement: any = {
    title: '',
    subtitle: '',
    description: '',
    duration_hours: 1,
    total_spots: 1,
    remaining_spots: 1,
    credits: 0,
  };

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (!id) {
      this.router.navigateByUrl('/annunci');
      return;
    }

    this.service.getAnnouncement(id).subscribe({
      next: (res) => {
        this.announcement = res.data;
        this.loading = false;
      },
      error: () => {
        alert('Annuncio non trovato o non modificabile');
        this.router.navigateByUrl('/annunci');
      },
    });
  }

  save() {
    this.saving = true;

    this.service.updateAnnouncement(this.announcement).subscribe({
      next: () => {
        alert('Annuncio aggiornato');
        this.router.navigateByUrl('/annunci');
      },
      error: () => {
        alert('Errore nel salvataggio');
        this.saving = false;
      },
    });
  }

  cancel() {
    this.router.navigateByUrl('/annunci');
  }
}
