import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

export interface WalletMovement {
  coupon_id: number;
  label: string;
  code: string | null;
  cost: number;
  redeemed_at: string;
  type: 'redeem';
}

@Injectable({ providedIn: 'root' })
export class WalletService {
  private base = 'http://localhost:8888/goat/api';

  constructor(private http: HttpClient) {}

  async redeemCoupon(
    couponId: number
  ): Promise<{ success: boolean; code: string }> {
    return await firstValueFrom(
      this.http.post<{ success: boolean; code: string }>(
        `${this.base}/redeem_coupon.php`,
        { coupon_id: couponId },
        { withCredentials: true }
      )
    );
  }

  async getMovements(): Promise<WalletMovement[]> {
    const res = await firstValueFrom(
      this.http.get<{ movements: WalletMovement[] }>(
        `${this.base}/redemptions.php`,
        { withCredentials: true }
      )
    );

    return res.movements;
  }
}
