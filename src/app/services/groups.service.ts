import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  Firestore,
  collection,
  collectionData,
  query,
  where,
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class GroupsService {
  constructor(private firestore: Firestore) {}

  // return all the groups, key this in the document id
  getAllGroups(): Observable<any> {
    const allGroupsCollection = collection(this.firestore, 'groups');
    return collectionData(allGroupsCollection, { idField: 'id' });
  }

  // query the joinedGroups collection, filtering on the
  // userId
  getUserJoinedGroups(userId: string): Observable<any[]> {
    const userJoinedGroupsQuery = query(
      collection(this.firestore, 'joinedGroups'),
      where('userId', '==', userId)
    );
    return collectionData(userJoinedGroupsQuery);
  }
}
