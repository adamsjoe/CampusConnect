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
export class InstitutionsService {
  constructor(private firestore: Firestore) {}

  // get the full text of the institution from the id stored in profile
  getInstitutionInfo(uuid: string): Observable<any> {
    const documentReference = doc(this.firestore, 'institutions', uuid);
    return new Observable<any>((observer) => {
      getDoc(documentReference)
        .then((documentSnapshot) => {
          if (documentSnapshot.exists()) {
            const data: any = documentSnapshot.data();

            observer.next(data);
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
