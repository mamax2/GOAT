import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Announcement } from '../models/announcement.model';

@Injectable({
  providedIn: 'root',
})
export class AnnouncementsService {
  private baseUrl = 'http://localhost:8888/goat/api/';

  constructor(private http: HttpClient) {}

  getAnnouncements(
    tab: 'richiesta' | 'offerta' | 'lastminute'
  ): Observable<{ success: boolean; data: Announcement[] }> {
    const params = new HttpParams().set('type', tab);

    return this.http.get<{ success: boolean; data: Announcement[] }>(
      `${this.baseUrl}announcements.php`,
      { params, withCredentials: true }
    );
  }

  createAnnouncement(data: any) {
    return this.http.post(this.baseUrl + 'new_announcements.php', data, {
      withCredentials: true,
    });
  }

  joinAnnouncement(announcementId: number) {
    return this.http.post<{ success: boolean }>(
      `${this.baseUrl}join.php`,
      { announcement_id: announcementId },
      { withCredentials: true }
    );
  }

  getPublished() {
    return this.http.get<{ data: any[] }>(
      `${this.baseUrl}my_announcements.php`,
      { withCredentials: true }
    );
  }

  getFollowed() {
    return this.http.get<{ data: any[] }>(
      `${this.baseUrl}followed_announcements.php`,
      { withCredentials: true }
    );
  }

  getAnnouncement(id: number) {
    return this.http.get<{ data: Announcement }>(
      `${this.baseUrl}get_announcement.php?id=${id}`,
      { withCredentials: true }
    );
  }

  updateAnnouncement(data: any) {
    return this.http.post(`${this.baseUrl}update_announcement.php`, data, {
      withCredentials: true,
    });
  }

  deleteAnnouncement(id: number) {
    return this.http.post<{ success: boolean }>(
      `${this.baseUrl}delete_announcement.php`,
      { id },
      { withCredentials: true }
    );
  }

  leaveAnnouncement(id: number) {
    return this.http.post<{ success: boolean }>(
      `${this.baseUrl}leave_announcement.php`,
      { announcement_id: id },
      { withCredentials: true }
    );
  }
}
