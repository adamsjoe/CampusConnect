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
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  allPosts: any;

  constructor(
    private posts: PostsService,
    private userService: UserService,
    private addPost: AlertController
  ) {
    const user = this.userService.getUser();
    console.log('you are : ', user);

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

  async insertPost() {
    const user = this.userService.getUser();
    const postDate = new Date();

    const prompt = await this.addPost.create({
      header: 'Add New Post',
      message: 'Insert New Post Here',
      inputs: [
        { name: 'title', placeholder: 'Post title' },
        { name: 'body', placeholder: 'Please enter message here' },
        {
          name: 'type',
          type: 'radio',
          label: 'General',
          value: 'general',
          checked: true,
        },
        {
          name: 'type',
          type: 'radio',
          label: 'Departmental',
          value: 'departmental',
        },
      ],
      buttons: [
        { text: 'Cancel' },
        {
          text: 'Add Post',
          handler: (evnt) => {
            this.posts.insertPost({
              postBody: evnt.body,
              postTime: postDate,
              title: evnt.title,
              type: evnt.type,
              userId: user,
            });
          },
        },
      ],
    });
    prompt.present();
  }
}
