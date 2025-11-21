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
  IonRouterLinkWithHref,
} from '@ionic/angular/standalone';

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
    IonRouterLinkWithHref,
  ],
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  private auth = inject(AuthService);
  private router = inject(Router);

  title = '';

  constructor(router: Router) {}

  async doLogout() {
    try {
      await this.auth.logout(); // POST /api/logout.php { withCredentials: true }
      await this.router.navigateByUrl('/login', { replaceUrl: true });
    } catch (err) {
      console.error('Logout fallito', err);
    }
  }

  goToProfile() {
    this.router.navigateByUrl('/profile');
  }
}
