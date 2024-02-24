import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { addDoc } from 'firebase/firestore';
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

  insertPost(post: any) {
    console.log('xx', post);
    const postCollection = collection(this.firestore, 'posts');
    return addDoc(postCollection, post);
  }
}
