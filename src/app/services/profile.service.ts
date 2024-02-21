import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  doc,
  getDoc,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class profileService {
  constructor(private firestore: Firestore) {}

  // getProfileInfo(): Observable<any> {
  //   const profileCollection = collection(this.firestore, 'usersCollection');
  //   return collectionData(profileCollection);
  // }

  getProfileInfo(uuid: string): Observable<any> {
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
