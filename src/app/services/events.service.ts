import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
@Injectable({
  providedIn: 'root',
})
export class EventsService {
  constructor(private firestore: AngularFirestore) {}

  addHighlightedDate(date: string, textColor: string, backgroundColor: string) {
    return this.firestore.collection('highlightedDates').add({
      date: date,
      textColor: textColor,
      backgroundColor: backgroundColor,
    });
  }
}
