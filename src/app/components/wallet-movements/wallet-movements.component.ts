import { Component, EventEmitter, Input, Output } from '@angular/core';
import { WalletMovement } from 'src/app/core/services/wallet-service';
import { IonIcon } from '@ionic/angular/standalone';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-wallet-movements',
  templateUrl: './wallet-movements.component.html',
  styleUrls: ['./wallet-movements.component.scss'],
  imports: [IonicModule],
})
export class WalletMovementsComponent {
  @Input() open = false;
  @Input() movements: WalletMovement[] = [];

  @Output() close = new EventEmitter<void>();

  onClose() {
    this.close.emit();
  }
}
