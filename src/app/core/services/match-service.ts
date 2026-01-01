import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export type MatchStatus = 'pending' | 'confirmed' | 'rejected';

export interface Match {
  match_id: number;

  match_status: 'pending' | 'confirmed' | 'rejected';
  validation_code: string | null;

  announcement_id: number;
  title: string;
  subtitle?: string | null;
  description: string;

  event_date?: string | null;
  event_time?: string | null;
  credits: number;

  my_side: 'creator' | 'participant';
}

@Injectable({ providedIn: 'root' })
export class MatchService {
  private baseUrl = 'http://localhost:8888/goat/api/';

  constructor(private http: HttpClient) {}

  getMyMatches(): Observable<{ success: boolean; data: Match[] }> {
    return this.http.get<{ success: boolean; data: Match[] }>(
      this.baseUrl + 'get_matches.php',
      { withCredentials: true }
    );
  }
}
