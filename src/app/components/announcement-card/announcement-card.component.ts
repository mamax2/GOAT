import { Component, Input } from '@angular/core';
import { Announcement } from 'src/app/core/models/announcement.model';

@Component({
  selector: 'app-announcement-card',
  templateUrl: './announcement-card.component.html',
  styleUrls: ['./announcement-card.component.scss'],
})
export class AnnouncementCardComponent {
  @Input() data!: Announcement;

  isToday(): boolean {
    if (!this.data.event_date) return false;
    const today = new Date().toISOString().split('T')[0];
    return this.data.event_date === today;
  }
}
