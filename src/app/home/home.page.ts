import { Component } from '@angular/core';
import { PostsService } from '../services/posts.service';
import { UserService } from '../services/currentUser.service';
import {
  Firestore,
  collection,
  collectionData,
  doc,
  getDoc,
} from '@angular/fire/firestore';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  allPosts: any;

  constructor(private posts: PostsService, private userService: UserService) {
    const user = this.userService.getUser();

    posts.getPosts().subscribe((data) => {
      this.allPosts = data.map((post: { postTime: { toDate: () => any } }) => {
        return {
          ...post,
          postTime: this.formatDate(post.postTime.toDate()),
        };
      });
    });
  }

  formatDate(date: Date): string {
    const day = date.getDate();
    const month = date.getMonth() + 1; // Month is 0-indexed
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    // Pad single digits with 0
    const formattedDay = day < 10 ? '0' + day : day;
    const formattedMonth = month < 10 ? '0' + month : month;
    const formattedHours = hours < 10 ? '0' + hours : hours;
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
    const formattedSeconds = seconds < 10 ? '0' + seconds : seconds;

    return `${formattedDay}/${formattedMonth}/${year} ${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  }
}
