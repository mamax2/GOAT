import { Component } from '@angular/core';
import {
  IonApp,
  IonRouterOutlet,
  IonSplitPane,
  IonMenu,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonFooter,
  IonTabBar,
  IonIcon,
  IonLabel,
} from '@ionic/angular/standalone';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    IonLabel,
    IonIcon,
    IonTabBar,
    IonFooter,
    IonApp,
    IonRouterOutlet,

    RouterLink,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  showFooter = true;

  private hiddenRoutes = ['/login', '/signup'];

  constructor(private router: Router) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        console.log('ROUTE:', event.urlAfterRedirects);
        this.showFooter = !this.hiddenRoutes.includes(event.urlAfterRedirects);
      });
  }
}
