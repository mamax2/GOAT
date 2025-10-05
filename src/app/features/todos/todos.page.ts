// src/app/features/todos/todos.page.ts
import { Component, inject } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonCheckbox,
  IonInput,
  IonButton,
} from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth-service';
import { Todo, TodoService } from 'src/app/core/services/todo-service';

@Component({
  standalone: true,
  imports: [
    FormsModule, // << per [(ngModel)]
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    IonCheckbox,
    IonInput,
    IonButton,
  ],
  template: `
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>Todos</ion-title>
        <ion-button slot="end" fill="clear" routerLink="/profile"
          >Profile</ion-button
        >
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <div class="ion-margin-bottom">
        <ion-input placeholder="Nuovo todo" [(ngModel)]="newTitle"></ion-input>
        <ion-button (click)="add()">Aggiungi</ion-button>
      </div>

      <ion-list>
        <ion-item *ngFor="let t of todos">
          <ion-checkbox
            slot="start"
            [checked]="t.done"
            (ionChange)="toggle(t)"
          ></ion-checkbox>
          <ion-label>{{ t.title }}</ion-label>
          <ion-button slot="end" color="danger" fill="clear" (click)="remove(t)"
            >Del</ion-button
          >
        </ion-item>
      </ion-list>
    </ion-content>
  `,
})
export class TodosPage {
  private auth = inject(AuthService);
  private service = inject(TodoService);

  uid: string | null = null;
  todos: Todo[] = [];
  newTitle = '';

  constructor() {
    this.auth.user$.subscribe((u) => {
      this.uid = u?.uid ?? null;
      if (this.uid)
        this.service
          .listByUser(this.uid)
          .subscribe((list) => (this.todos = list));
    });
  }

  async add() {
    if (!this.uid || !this.newTitle.trim()) return;
    await this.service.add({
      title: this.newTitle.trim(),
      done: false,
      uid: this.uid,
    });
    this.newTitle = '';
  }
  toggle(t: Todo) {
    if (t.id) this.service.update(t.id, { done: !t.done });
  }
  remove(t: Todo) {
    if (t.id) this.service.remove(t.id);
  }
}
