import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { AnnouncementsService } from 'src/app/core/services/announcements-service';

@Component({
  selector: 'app-annunci',
  standalone: true,
  imports: [IonicModule, CommonModule],
  templateUrl: './annunci.page.html',
  styleUrls: ['./annunci.page.scss'],
})
export class AnnunciPage {
  private router = inject(Router);
  private service = inject(AnnouncementsService);

  activeTab: 'seguiti' | 'pubblicati' = 'pubblicati';
  annunci: any[] = [];
  loading = false;

  ngOnInit() {
    this.load();
  }

  load() {
    this.loading = true;

    const req =
      this.activeTab === 'pubblicati'
        ? this.service.getPublished()
        : this.service.getFollowed();

    req.subscribe({
      next: (res) => {
        this.annunci = res.data;
        this.loading = false;
      },
      error: () => {
        alert('Errore caricamento annunci');
        this.loading = false;
      },
    });
  }

  switchTab(tab: 'seguiti' | 'pubblicati') {
    this.activeTab = tab;
    this.annunci = [];
    this.load();
  }

  goToProfile() {
    this.router.navigateByUrl('/profile');
  }

  goToAnnouncement() {
    this.router.navigateByUrl('/new-announcement');
  }

  edit(id: number) {
    this.router.navigateByUrl(`/edit-announcement/${id}`);
  }

  delete(id: number) {
    if (!confirm('Eliminare annuncio?')) return;

    this.service.deleteAnnouncement(id).subscribe({
      next: () => {
        alert('Annuncio eliminato');
        this.load();
      },
      error: (err) => {
        console.error(err);
        alert('Non puoi eliminare questo annuncio');
      },
    });
  }

  leave(id: number) {
    this.service.leaveAnnouncement(id).subscribe({
      next: () => {
        alert('Hai abbandonato l’annuncio');
        this.load();
      },
      error: (err) => {
        console.error(err);
        alert('Errore durante l’operazione');
      },
    });
  }
}
