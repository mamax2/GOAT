import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

export interface AuthUser {
  id: number;
  name: string;
  email: string;

  user_role: 'student/tutor' | 'admin';
  main_subject: string | null;

  level: number;
  goat_coins: number;
  lessons_as_tutor: number;
  lessons_as_student: number;

  avatar_url: string | null;

  created_at: string;
  updated_at: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private base = 'http://localhost:8888/goat/api';

  constructor(private http: HttpClient) {}

  async signup(
    name: string,
    email: string,
    password: string
  ): Promise<{ message: string }> {
    const payload = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password,
    };

    try {
      return await firstValueFrom(
        this.http.post<{ message: string }>(
          `${this.base}/signup.php`,
          payload,
          { withCredentials: true }
        )
      );
    } catch (err) {
      throw this.normalizeError(err);
    }
  }

  async login(
    email: string,
    password: string
  ): Promise<{ message: string; user: AuthUser }> {
    const payload = {
      email: email.trim().toLowerCase(),
      password,
    };

    try {
      return await firstValueFrom(
        this.http.post<{ message: string; user: AuthUser }>(
          `${this.base}/login.php`,
          payload,
          { withCredentials: true }
        )
      );
    } catch (err) {
      throw this.normalizeError(err);
    }
  }

  async me(): Promise<{ user: AuthUser }> {
    try {
      return await firstValueFrom(
        this.http.get<{ user: AuthUser }>(`${this.base}/me.php`, {
          withCredentials: true,
        })
      );
    } catch (err) {
      throw this.normalizeError(err);
    }
  }

  async logout(): Promise<void> {
    try {
      await firstValueFrom(
        this.http.post(
          `${this.base}/logout.php`,
          {},
          {
            withCredentials: true,
            responseType: 'text' as const,
          }
        )
      );
    } catch (err) {
      throw this.normalizeError(err);
    }
  }

  async updateProfile(
    data: Partial<AuthUser>
  ): Promise<{ success: boolean; message: string }> {
    try {
      return await firstValueFrom(
        this.http.post<{ success: boolean; message: string }>(
          `${this.base}/update_profile.php`,
          data,
          { withCredentials: true }
        )
      );
    } catch (err) {
      throw this.normalizeError(err);
    }
  }

  private normalizeError(err: any): Error {
    const http = err as HttpErrorResponse;

    // Errori noti
    if (http.status === 401) return new Error('Unauthorized');
    if (http.status === 404) return new Error('Not Found');
    if (http.status === 500) return new Error('Server Error');

    // Estraggo messaggio dal backend se presente
    const backend =
      http?.error?.error ||
      http?.error?.message ||
      http?.statusText ||
      http?.message;

    return new Error(backend || 'Errore di rete');
  }
}
