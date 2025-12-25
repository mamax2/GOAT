import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';

import { AuthService, AuthUser } from 'src/app/core/services/auth-service';
import {
  WalletService,
  WalletMovement,
} from 'src/app/core/services/wallet-service';
import { WalletMovementsComponent } from 'src/app/components/wallet-movements/wallet-movements.component';

interface Coupon {
  id: number;
  title: string;
  subtitle: string;
  cost: number;
  redeemed?: boolean;
}
@Component({
  selector: 'app-wallet',
  standalone: true,
  imports: [IonicModule, CommonModule, WalletMovementsComponent],
  templateUrl: './wallet.page.html',
  styleUrls: ['./wallet.page.scss'],
})
export class WalletPage implements OnInit {
  private router = inject(Router);

  credits = 0;
  user?: AuthUser;

  movements: WalletMovement[] = [];
  isLoadingMovements = false;
  loadingCouponId: number | null = null;

  coupons: Coupon[] = [
    {
      id: 1,
      title: '20% Sconto Caffè',
      subtitle: 'Valido da Babbi e Volume a Cesena',
      cost: 500,
    },
    {
      id: 2,
      title: '30% Buono Cinema',
      subtitle: 'Valido in Cinema Eliseo a Cesena',
      cost: 500,
    },
    {
      id: 3,
      title: '25% Buono Pizza',
      subtitle: 'Valido in Margherite pizze popolari',
      cost: 500,
    },
    {
      id: 4,
      title: '25% Buono Libri',
      subtitle: 'Valido in Mondadori',
      cost: 500,
    },
  ];
  movementsOpen = false;

  constructor(
    private auth: AuthService,
    private walletService: WalletService
  ) {}

  ngOnInit() {
    this.auth.user$.subscribe((user) => {
      this.user = user ?? undefined;
      this.credits = user?.goat_coins ?? 0;
    });

    if (!this.auth.currentUser) {
      this.auth.me();
    }

    this.loadRedeemedState();
  }

  private async loadRedeemedState() {
    try {
      this.movements = await this.walletService.getMovements();
      this.markRedeemedCoupons();
    } catch (err) {
      console.warn('Impossibile caricare stato coupon riscattati');
    }
  }

  goToProfile() {
    this.router.navigateByUrl('/profile');
  }

  async openMovements() {
    try {
      this.movements = await this.walletService.getMovements();
      this.markRedeemedCoupons();
      this.movementsOpen = true;
    } catch (err) {
      alert('Errore nel caricamento dei movimenti');
    }
  }

  async redeemCoupon(coupon: any) {
    if (this.credits < coupon.cost || coupon.redeemed) return;

    this.loadingCouponId = coupon.id;

    try {
      const res = await this.walletService.redeemCoupon(coupon.id);

      this.credits -= coupon.cost;

      alert(`Codice: ${res.code}`);
    } catch (err: any) {
      alert(err.message || 'Errore nel riscatto');
    } finally {
      this.loadingCouponId = null;
    }
  }

  markRedeemedCoupons() {
    const redeemedIds = new Set(this.movements.map((m) => m.coupon_id));

    this.coupons = this.coupons.map((c) => ({
      ...c,
      redeemed: redeemedIds.has(c.id),
    }));
  }
}
