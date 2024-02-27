import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { addDoc, orderBy, query } from 'firebase/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor(private firestore: Firestore) {}

  // get all the posts and return them in descending time order
  // make sure to key on the id field
  getPosts(): Observable<any> {
    const postsCollection = collection(this.firestore, 'posts');
    const orderedPostsQuery = query(
      postsCollection,
      orderBy('postTime', 'desc')
    );
    return collectionData(orderedPostsQuery, { idField: 'id' });
  }

  // insert a post
  insertPost(post: any) {
    console.log('xx', post);
    const postCollection = collection(this.firestore, 'posts');
    return addDoc(postCollection, post);
  }
}
