import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonList,
  IonCard,
  IonIcon,
  IonButton,
  IonFooter,
  IonTabBar,
  IonCardTitle,
  IonCardHeader,
  IonCardSubtitle,
  IonCardContent,
  IonAccordion,
  IonLabel,
  IonItem,
  IonAccordionGroup,
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [
    IonAccordionGroup,
    IonItem,
    IonLabel,
    IonAccordion,

    IonCardHeader,
    IonContent,
    IonHeader,
    CommonModule,
    FormsModule,
    IonCard,
  ],
})
export class ProfilePage implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}

  goToHome() {
    this.router.navigateByUrl('/home');
  }
}
