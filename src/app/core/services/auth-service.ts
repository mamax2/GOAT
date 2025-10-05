import { Injectable, inject } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  User,
} from '@angular/fire/auth';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private auth = inject(Auth);
  private _user$ = new BehaviorSubject<User | null>(null);
  user$ = this._user$.asObservable();

  constructor() {
    onAuthStateChanged(this.auth, (user) => this._user$.next(user));
  }

  signup(email: string, pass: string) {
    return createUserWithEmailAndPassword(this.auth, email, pass);
  }
  login(email: string, pass: string) {
    return signInWithEmailAndPassword(this.auth, email, pass);
  }
  loginWithGoogle() {
    return signInWithPopup(this.auth, new GoogleAuthProvider());
  }
  logout() {
    return signOut(this.auth);
  }

  get currentUser() {
    return this.auth.currentUser;
  }
}
