import { Injectable } from '@angular/core';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private firestore: Firestore) {}

  getUserInfo(uuid: string): Observable<any> {
    const documentReference = doc(this.firestore, 'usersCollection', uuid);
    return new Observable<any>((observer) => {
      getDoc(documentReference)
        .then((documentSnapshot) => {
          if (documentSnapshot.exists()) {
            observer.next(documentSnapshot.data());
          } else {
            observer.next(null);
          }
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }
}
