import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-annunci',
  standalone: true,
  imports: [IonicModule, CommonModule],
  templateUrl: './annunci.page.html',
  styleUrls: ['./annunci.page.scss'],
})
export class AnnunciPage {
  private router = inject(Router);

  activeTab: 'seguiti' | 'pubblicati' = 'pubblicati';
  goToProfile() {
    this.router.navigateByUrl('/profile');
  }
  goToAnnouncement() {
    this.router.navigateByUrl('/new-announcement');
  }

  annunci = [
    {
      title: 'Matematica: medie o superiori',
      school: 'scuola',
      level: 'superiori',
      subject: 'matematica',
      skill: 'principiante',
      description:
        'RichText allows for various styles and features to be customized within one set of text, such as',
      hours: 2,
      seats: 5,
      credits: 50,
    },
  ];
}
