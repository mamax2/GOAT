import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
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
  IonIcon,
  IonCard,
  IonTabBar,
  IonTabButton,
  IonFooter,
} from '@ionic/angular/standalone';

import { ItemsService, Item } from './items.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth-service';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [
    IonFooter,
    IonTabButton,
    IonTabBar,
    IonCard,
    IonIcon,
    CommonModule,
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
  ],
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  private itemsSvc = inject(ItemsService);
  private auth = inject(AuthService);
  private router = inject(Router);

  items: Item[] = [];
  title = '';

  constructor() {
    // con PHP/JWT non serve l'uid: il backend lo ricava dal token
    this.refresh();
  }

  refresh() {
    this.itemsSvc.list().subscribe((list) => (this.items = list));
  }

  add() {
    const t = this.title.trim();
    if (!t) return;
    this.itemsSvc.add(t).subscribe(() => {
      this.title = '';
      this.refresh();
    });
  }

  toggle(it: Item) {
    if (!it.id) return;
    const done = it.done ? 0 : 1;
    this.itemsSvc.update(it.id, { done }).subscribe(() => this.refresh());
  }

  remove(it: Item) {
    if (!it.id) return;
    this.itemsSvc.remove(it.id).subscribe(() => this.refresh());
  }

  logout() {
    this.auth.logout();
    this.router.navigateByUrl('/login');
  }
}
