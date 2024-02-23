import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor(private firestore: Firestore) {}

  getPosts(): Observable<any> {
    const aboutInfoCollection = collection(this.firestore, 'posts');
    return collectionData(aboutInfoCollection);
  }
}
