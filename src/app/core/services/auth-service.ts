// src/app/core/services/auth-service.ts (schema rapido)
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

export interface AuthUser {
  id: number;
  name: string;
  email: string;
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
      name: (name ?? '').trim(),
      email: (email ?? '').trim().toLowerCase(),
      password: password ?? '',
    };

    try {
      const res = await firstValueFrom(
        this.http.post<{ message: string }>(`${this.base}/signup.php`, payload)
      );
      return res;
    } catch (err) {
      throw this.normalizeError(err);
    }
  }

  /** LOGIN
   *  crea la sessione sul backend (cookie). */
  async login(
    email: string,
    password: string
  ): Promise<{ message: string; user: AuthUser }> {
    const payload = {
      email: email.trim().toLowerCase(),
      password: password ?? '',
    };

    try {
      const res = await firstValueFrom(
        this.http.post<{ message: string; user: AuthUser }>(
          `${this.base}/login.php`,
          payload,
          { withCredentials: true }
        )
      );
      return res;
    } catch (err) {
      throw this.normalizeError(err);
    }
  }

  /** ME
   * legge l’utente dalla sessione. */
  async me(): Promise<{ user: AuthUser }> {
    try {
      const res = await firstValueFrom(
        this.http.get<{ user: AuthUser }>(`${this.base}/me.php`, {
          withCredentials: true,
        })
      );
      return res;
    } catch (err) {
      throw this.normalizeError(err);
    }
  }

  /** LOGOUT
   * distrugge la sessione. */
  async logout() {
    return await firstValueFrom(
      this.http.post(
        `${this.base}/logout.php`,
        {},
        {
          withCredentials: true,
          responseType: 'text' as const,
        }
      )
    );
  }

  /** Normalizza gli errori HTTP in messaggi leggibili dalla UI. */
  private normalizeError(err: any): Error {
    const http = err as HttpErrorResponse;
    const msg =
      (http?.error && (http.error.error || http.error.message)) ||
      http?.statusText ||
      http?.message ||
      'Errore di rete';
    return new Error(msg);
  }
}
