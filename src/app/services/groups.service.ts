import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class GroupsService {
  constructor(private firestore: Firestore) {}

  getAllGroups(): Observable<any> {
    const allGroupsCollection = collection(this.firestore, 'groups');
    return collectionData(allGroupsCollection);
  }
}
