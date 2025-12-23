import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-match',
  standalone: true,
  imports: [IonicModule, CommonModule],
  templateUrl: './match.page.html',
  styleUrls: ['./match.page.scss'],
})
export class MatchPage {
  private router = inject(Router);

  matches = [
    {
      title: 'Limiti notevoli',
      context: 'scuola',
      level: 'superiori',
      subject: 'matematica',
      skill: 'principiante',
      description:
        'RichText allows for various styles and features to be customized within one set of text, such as',
      date: '23/12/2025',
      time: '20:20',
      credits: 50,
      icon: 'school-outline',
    },
    {
      title: 'Musica: chitarra',
      context: 'hobby',
      level: 'chiunque',
      subject: 'arte',
      skill: 'avanzato',
      description:
        'RichText allows for various styles and features to be customized within one set of text, such as',
      date: '23/12/2025',
      time: '20:20',
      credits: 20,
      icon: 'color-palette-outline',
    },
  ];

  goToProfile() {
    this.router.navigateByUrl('/profile');
  }
}
