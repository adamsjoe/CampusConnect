import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { addDoc, orderBy, query, where } from 'firebase/firestore';
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

  // get a list of the related posts.
  // had to create an index to use this query.
  // using postParentPost and postTime ascending
  getRelatedPosts(parentPostId: string): Observable<any[]> {
    console.log('making query for parent post id ', parentPostId);
    // setup the query
    const relatedPostsQuery = query(
      collection(this.firestore, 'posts'),
      where('postParentPost', '==', parentPostId),
      orderBy('postTime', 'asc')
    );
    return collectionData(relatedPostsQuery);
  }

  // insert a post
  insertPost(post: any) {
    console.log('xx', post);
    const postCollection = collection(this.firestore, 'posts');
    return addDoc(postCollection, post);
  }
}
