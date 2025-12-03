import { Component, OnInit } from '@angular/core';
import { Announcement } from 'src/app/core/models/announcement.model';
import { AnnouncementsService } from 'src/app/core/services/announcements-service';
import { AnnouncementCardComponent } from '../announcement-card/announcement-card.component';

@Component({
  selector: 'app-announcements-list',
  templateUrl: './announcements-list.component.html',
  styleUrls: ['./announcements-list.component.scss'],
  imports: [AnnouncementCardComponent],
})
export class AnnouncementsListComponent implements OnInit {
  announcements: Announcement[] = [];
  loading = true;

  activeTab: 'richiesta' | 'offerta' | 'lastminute' = 'richiesta';

  constructor(private service: AnnouncementsService) {}

  ngOnInit() {
    this.loadAnnouncements();
  }

  loadAnnouncements() {
    this.loading = true;
    this.service.getAnnouncements(this.activeTab).subscribe((res) => {
      this.announcements = res.data;
      this.loading = false;
    });
  }

  changeTab(tab: 'richiesta' | 'offerta' | 'lastminute') {
    this.activeTab = tab;
    this.loadAnnouncements();
  }
}
