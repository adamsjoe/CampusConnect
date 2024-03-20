import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  query,
  orderBy,
  where,
  collectionGroup,
  QuerySnapshot,
  getDocs,
  collectionData,
  addDoc,
} from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

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

  /**
   * Get unread posts
   * @param userId
   * @returns
   */
  getUnreadPosts(userId: string): Observable<any[]> {
    // Query for all posts
    const postsCollection = collection(this.firestore, 'posts');
    const orderedPostsQuery = query(
      postsCollection,
      orderBy('postTime', 'desc')
    );

    // Fetch all unread post IDs for the user
    const unreadPostsCollection = collection(this.firestore, 'readPosts');
    const unreadPostsQuery = query(
      unreadPostsCollection,
      where('user', '==', userId)
    );

    return collectionData(unreadPostsQuery).pipe(
      switchMap((unreadPosts) => {
        const unreadPostIds = unreadPosts.map((post: any) => post.postId);

        // Filter out the posts that have been read by the user
        return collectionData(orderedPostsQuery, { idField: 'id' }).pipe(
          catchError((error) => {
            console.error('Error fetching posts:', error);
            return of([]); // Return empty array in case of error
          }),
          switchMap((posts) => {
            return of(posts.filter(post => {
              // Exclude the post if it's marked as read by the user or if the user is the author
              return !unreadPostIds.includes(post.id) && post['postAuthor'] !== userId;
            }));
          })
        );
      }),
      catchError((error) => {
        console.error('Error fetching unread posts:', error);
        return of([]); // Return empty array in case of error
      })
    );
    
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

  insertIntoReadPosts(postId: string, user: string) {
    const readPostsCollection = collection(this.firestore, 'readPosts');
    const data = { postId, user };
    return addDoc(readPostsCollection, data);
  }
}
