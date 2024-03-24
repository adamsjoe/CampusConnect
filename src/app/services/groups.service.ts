import { Injectable } from '@angular/core';
import {
  Observable,
  catchError,
  combineLatest,
  forkJoin,
  from,
  map,
  tap,
  throwError,
} from 'rxjs';
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

@Injectable({
  providedIn: 'root',
})
export class GroupsService {
  constructor(private firestore: Firestore) {}

  /**
   * return all the groups, key this in the document id
   * @returns
   */
  getAllGroups(): Observable<any> {
    const allGroupsCollection = collection(this.firestore, 'groups');
    return collectionData(allGroupsCollection, { idField: 'id' });
  }

  /**
   * query the joinedGroups collection, filtering on the userId
   * @param userId
   * @returns
   */
  getUserJoinedGroups(userId: string): Observable<any[]> {
    const userJoinedGroupsQuery = query(
      collection(this.firestore, 'joinedGroups'),
      where('userId', '==', userId)
    );
    return collectionData(userJoinedGroupsQuery);
  }

  getJoinedGroupNames(groupIds: string[]): Observable<any[]> {
    const groupObservables = groupIds.map((groupId) =>
      from(getDoc(doc(this.firestore, 'groups', groupId))).pipe(
        map((snapshot) => ({
          id: snapshot.id,
          name: snapshot.data()?.['groupName'],
        }))
      )
    );

    return forkJoin(groupObservables);
  }

  getGroupCol(postTypeIds: string[]): Observable<any[]> {
    const groupObservables = postTypeIds.map((postTypeId) =>
      from(getDoc(doc(this.firestore, 'groups', postTypeId))).pipe(
        map((snapshot) => {
          const data = snapshot.data();
          console.log('Data for postTypeId', postTypeId, ':', data); // Check the data retrieved
          return {
            id: snapshot.id,
            groupCol: data?.['groupColour'],
          };
        })
      )
    );

    return forkJoin(groupObservables);
  }

  // Method to join a group
  joinGroup(user: any, groupId: string): Observable<any> {
    console.log('join 2 1');
    console.log('group id is: ', groupId);
    console.log('user is: ', user);
    const groupDocRef = doc(this.firestore, 'joinedGroups', groupId);
    const data = {
      userId: user,
      groupId: groupId,
    };
    return from(setDoc(groupDocRef, data));
  }

  // Method to leave a group
  async leaveGroup(user: any, groupId: string): Promise<any> {
    console.log(
      'Attempting to delete document with groupId:',
      groupId,
      'and userId:',
      user.id
    );

    try {
      // Construct a query to find the document matching both groupId and userId
      const joinedGroupsQuery = query(
        collection(this.firestore, 'joinedGroups'),
        where('groupId', '==', groupId),
        where('userId', '==', user)
      );

      // Execute the query to get the matching document
      const querySnapshot = await getDocs(joinedGroupsQuery);

      // If the query returns any documents, delete the first one found
      querySnapshot.forEach(async (doc: any) => {
        await deleteDoc(doc.ref);
        console.log('Document deleted successfully');
      });
    } catch (error) {
      console.error('Error deleting document:', error);
    }
  }

  getGroupColour(type: string): Observable<string | null> {
    const userJoinedGroupsQuery = query(
      collection(this.firestore, 'groups'),
      where('id', '==', type)
    );

    return collectionData(userJoinedGroupsQuery).pipe(
      map((groups) => {
        if (groups && groups.length > 0) {
          return groups[0]['groupColour'];
        } else {
          return null;
        }
      })
    );
  }
}
