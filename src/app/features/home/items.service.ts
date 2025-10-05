import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  query,
  where,
  Timestamp,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface Item {
  id?: string;
  title: string;
  uid: string;
  createdAt: any;
}

@Injectable({ providedIn: 'root' })
export class ItemsService {
  private fs = inject(Firestore);
  private ref = collection(this.fs, 'items');

  listByUser(uid: string): Observable<Item[]> {
    return collectionData(query(this.ref, where('uid', '==', uid)), {
      idField: 'id',
    }) as unknown as Observable<Item[]>;
  }
  add(uid: string, title: string) {
    return addDoc(this.ref, { uid, title, createdAt: Timestamp.now() });
  }
  update(id: string, patch: Partial<Item>) {
    return updateDoc(doc(this.fs, `items/${id}`), patch);
  }
  remove(id: string) {
    return deleteDoc(doc(this.fs, `items/${id}`));
  }
}
