import { Injectable } from '@angular/core';
// import { AngularFirestore } from '@angular/fire/compat/firestore';
import {
  DocumentData,
  DocumentReference,
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
  DocumentSnapshot,
} from '@angular/fire/firestore';
import { Observable, forkJoin, map, switchMap } from 'rxjs';
import { GroupsService } from './groups.service';
@Injectable({
  providedIn: 'root',
})
export class EventsService {
  constructor(
    private firestore: Firestore,
    private groupsService: GroupsService
  ) {}

  // this works to get all
  getAllEvents(): Observable<any> {
    const allEventsCollection = collection(this.firestore, 'events');
    return collectionData(allEventsCollection, { idField: 'id' }).pipe(
      map((events) =>
        events.map((event) => ({
          date: this.formatDate(event['eventDate'].toDate()),
          textColor: '#FFFFFF',
          backgroundColor: event['backgroundColor'],
          title: event['eventTitle'],
          desc: event['eventDesc'],
          location: event['eventLocation'],
          time: event['eventTime'],
          type: event['eventType'],
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
