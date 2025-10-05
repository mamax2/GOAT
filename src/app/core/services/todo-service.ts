// per il firestore crud

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

export interface Todo {
  id?: string;
  title: string;
  done: boolean;
  uid: string;
  createdAt: any;
}

@Injectable({ providedIn: 'root' })
export class TodoService {
  private fs = inject(Firestore);
  private ref = collection(this.fs, 'todos');

  listByUser(uid: string, done?: boolean): Observable<Todo[]> {
    const q =
      done === undefined
        ? query(this.ref, where('uid', '==', uid))
        : query(this.ref, where('uid', '==', uid), where('done', '==', done));
    return collectionData(q, { idField: 'id' }) as unknown as Observable<
      Todo[]
    >;
  }

  add(todo: Omit<Todo, 'id' | 'createdAt'>) {
    return addDoc(this.ref, { ...todo, createdAt: Timestamp.now() });
  }

  update(id: string, patch: Partial<Todo>) {
    return updateDoc(doc(this.fs, `todos/${id}`), patch);
  }
  remove(id: string) {
    return deleteDoc(doc(this.fs, `todos/${id}`));
  }
}
