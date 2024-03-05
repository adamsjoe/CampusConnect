import { Injectable } from '@angular/core';
// import { AngularFirestore } from '@angular/fire/compat/firestore';
import {
  Firestore,
  collection,
  collectionData,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from '@angular/fire/firestore';
import { Observable, map } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class EventsService {
  constructor(private firestore: Firestore) {}

  // this works to get all
  getAllEvents(): Observable<any> {
    const allEventsCollection = collection(this.firestore, 'events');
    return collectionData(allEventsCollection, { idField: 'id' }).pipe(
      map((events) =>
        events.map((event) => ({
          date: this.formatDate(event['eventDate'].toDate()),
          textColor: '#000000',
          backgroundColor: '#09721b',
          desc: event['eventTitle'],
          type: 'general announcement',
        }))
      )
    );
  }

  // addHighlightedDate(date: string, textColor: string, backgroundColor: string) {
  //   return this.firestore.collection('highlightedDates').add({
  //     date: date,
  //     textColor: textColor,
  //     backgroundColor: backgroundColor,
  //   });
  // }

  public formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}
