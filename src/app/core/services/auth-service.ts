import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private base = environment.apiBase;

  private _user$ = new BehaviorSubject<User | null>(this.readUser());
  user$ = this._user$.asObservable();

  private readUser(): User | null {
    const raw = localStorage.getItem('user');
    try {
      return raw ? (JSON.parse(raw) as User) : null;
    } catch {
      return null;
    }
  }
  private setSession(token: string, user: User) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this._user$.next(user);
  }

  async signup(name: string, email: string, password: string) {
    const res = await firstValueFrom(
      this.http.post<any>(`${this.base}/auth.php?r=signup`, {
        name,
        email,
        password,
      })
    );
    this.setSession(res.token, res.user);
    return res.user as User;
  }

  async login(email: string, password: string) {
    const res = await firstValueFrom(
      this.http.post<any>(`${this.base}/auth.php?r=login`, { email, password })
    );
    this.setSession(res.token, res.user);
    return res.user as User;
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this._user$.next(null);
  }

  get token() {
    return localStorage.getItem('token');
  }
  get currentUser() {
    return this._user$.value;
  }
  isAuthenticated() {
    return !!this.token;
  }
}
