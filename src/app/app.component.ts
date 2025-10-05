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
} from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
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
    RouterLink,
  ],
  template: `
    <ion-app>
      <ion-split-pane when="lg" contentId="main">
        <ion-menu contentId="main">
          <ion-header>
            <ion-toolbar color="primary">
              <ion-title>GOAT</ion-title>
            </ion-toolbar>
          </ion-header>
          <ion-content>
            <ion-list>
              <ion-item routerLink="/todos">Todos</ion-item>
              <ion-item routerLink="/profile">Profile</ion-item>
            </ion-list>
          </ion-content>
        </ion-menu>
        <ion-router-outlet id="main"></ion-router-outlet>
      </ion-split-pane>
    </ion-app>
  `,
})
export class AppComponent {}
