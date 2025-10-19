import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

export interface Item {
  description: any;
  id?: number;
  title: string;
  done?: number;
  created_at?: string;
}

@Injectable({ providedIn: 'root' })
export class ItemsService {
  private http = inject(HttpClient);
  private base = environment.apiBase;

  list(): Observable<Item[]> {
    return this.http.get<Item[]>(`${this.base}/items.php`);
  }
  add(title: string): Observable<Item> {
    return this.http.post<Item>(`${this.base}/items.php`, { title });
  }
  update(id: number, patch: Partial<Item>): Observable<any> {
    return this.http.patch(`${this.base}/items.php?id=${id}`, patch);
  }
  remove(id: number): Observable<any> {
    return this.http.delete(`${this.base}/items.php?id=${id}`);
  }
}
