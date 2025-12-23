import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService, AuthUser } from 'src/app/core/services/auth-service';

@Component({
  selector: 'app-wallet',
  standalone: true,
  imports: [IonicModule, CommonModule],
  templateUrl: './wallet.page.html',
  styleUrls: ['./wallet.page.scss'],
})
export class WalletPage {
  private router = inject(Router);
  credits = 0;
  user?: AuthUser;

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

  constructor(private auth: AuthService) {}

  ngOnInit() {
    this.auth.user$.subscribe((user) => {
      if (user) {
        this.credits = user.goat_coins;
      }
    });

    // se ricarica la pagina
    if (!this.auth.currentUser) {
      this.auth.me();
    }
  }

  goToProfile() {
    this.router.navigateByUrl('/profile');
  }
}
