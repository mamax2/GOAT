import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-wallet',
  standalone: true,
  imports: [IonicModule, CommonModule],
  templateUrl: './wallet.page.html',
  styleUrls: ['./wallet.page.scss'],
})
export class WalletPage {
  private router = inject(Router);

  coupons = [
    {
      title: '20% Sconto Caffè',
      subtitle: 'Valido in Starbucks, Costa, Nero',
      cost: 500,
    },
    {
      title: '30% Buono Cinema',
      subtitle: 'Valido in Cinema Eliseo, Cesena',
      cost: 500,
    },
    {
      title: '25% Buono pizza',
      subtitle: 'Valido in Ristorante Guttaperga',
      cost: 500,
    },
  ];

  goToProfile() {
    this.router.navigateByUrl('/profile');
  }
}
