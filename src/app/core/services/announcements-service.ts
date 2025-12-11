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
    type: 'richiesta' | 'offerta' | 'lastminute'
  ): Observable<{ success: boolean; data: Announcement[] }> {
    const params = new HttpParams().set('type', type);
    return this.http.get<{ success: boolean; data: Announcement[] }>(
      this.baseUrl + 'announcements.php',
      { params }
    );
  }

  createAnnouncement(data: any) {
    return this.http.post(this.baseUrl + 'admin_announcements.php', data);
  }
}
