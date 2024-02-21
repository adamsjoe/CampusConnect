import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class aboutAppService {
  constructor(private firestore: Firestore) {}

  getAboutInfo(): Observable<any> {
    const aboutInfoCollection = collection(this.firestore, 'about');
    return collectionData(aboutInfoCollection, { idField: 'about' });
  }
}
