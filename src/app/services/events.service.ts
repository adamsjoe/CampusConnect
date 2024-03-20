import { Injectable } from '@angular/core';
// import { AngularFirestore } from '@angular/fire/compat/firestore';
import {
  DocumentData,
  DocumentReference,
  Firestore,
  collection,
  collectionData,
  addDoc,
  Timestamp,
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

  /**
   * Gets all events in the database
   * // TODO - Currently is a bit 'dumb' and returns all events
   * we should have logic to only return events for the specific institution
   *
   * @returns collection of data in a specific format - the format is what the calander takes
   */
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

  /**
   * formats the date string passed in
   *
   * @param date
   * @returns date in format yyyy-mm-ddd
   */
  public formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  /**
   * Inserts an event into the 'events' collection in firebase.
   *
   * @param event
   * @returns add document to firebase
   */
  insertEvent(event: any) {
    const eventsCollection = collection(this.firestore, 'events');
    return addDoc(eventsCollection, event);
  }
}
