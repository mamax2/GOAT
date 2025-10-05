import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonCheckbox,
} from '@ionic/angular/standalone';
import { ItemsService, Item } from './items.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth-service';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    IonCheckbox,
  ],
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  private auth = inject(AuthService);
  private itemsSvc = inject(ItemsService);
  private router = inject(Router);

  uid: string | null = null;
  items: Item[] = [];
  title = '';

  constructor() {
    this.auth.user$.subscribe((u) => {
      this.uid = u?.uid ?? null;
      if (this.uid)
        this.itemsSvc
          .listByUser(this.uid)
          .subscribe((list) => (this.items = list));
    });
  }

  async add() {
    if (!this.uid || !this.title.trim()) return;
    await this.itemsSvc.add(this.uid, this.title.trim());
    this.title = '';
  }
  remove(it: Item) {
    if (it.id) this.itemsSvc.remove(it.id);
  }
  async logout() {
    await this.auth.logout();
    this.router.navigateByUrl('/login');
  }
}
