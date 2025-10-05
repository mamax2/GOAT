import { Injectable, inject } from '@angular/core';
import {
  Storage,
  ref,
  uploadBytes,
  getDownloadURL,
} from '@angular/fire/storage';

@Injectable({ providedIn: 'root' })
export class StorageService {
  private storage = inject(Storage);

  async uploadAvatar(uid: string, file: Blob) {
    const r = ref(this.storage, `users/${uid}/avatar.jpg`);
    await uploadBytes(r, file);
    return getDownloadURL(r);
  }
}
