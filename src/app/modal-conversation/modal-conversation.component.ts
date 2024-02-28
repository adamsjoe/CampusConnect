import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UsersService } from '../services/users.service';
import { PostsService } from '../services/posts.service';

@Component({
  selector: 'app-modal-conversation',
  templateUrl: './modal-conversation.component.html',
  styleUrls: ['./modal-conversation.component.scss'],
})
export class ModalConversationComponent implements OnInit {
  @Input() post: any; // Main post
  @Input() relatedPosts: any[] = []; // Related posts
  userFullNames: { [userId: string]: string } = {};
  allPosts: any;

  constructor(
    private modalController: ModalController,
    private userService: UsersService,
    private postsService: PostsService
  ) {}

  ngOnInit() {
    this.getUserInfo(this.post.postAuthor); // postAuthor contains the user ID
    this.getRelatedPosts(this.post.id); // get related posts
  }

  getUserInfo(userId: string) {
    this.userService.getUserInfo(userId).subscribe(
      (user) => {
        const fullName = `${user.firstName} ${user.lastName}`; // Concatenate first name and last name
        this.userFullNames[userId] = fullName; // Store full name in the object using userId as the key
        console.log('User details:', user);
      },
      (error) => {
        console.error('Error fetching user details:', error);
      }
    );
  }

  getRelatedPosts(parentPostId: string) {
    console.log('get related post for ', parentPostId);
    this.postsService.getRelatedPosts(parentPostId).subscribe(
      (posts) => {
        this.relatedPosts = this.formatRelatedPosts(posts);
        console.log('Related posts:', this.relatedPosts);
        // Once related posts are loaded, call getUserInfo for each related post author
        for (const relatedPost of this.relatedPosts) {
          this.getUserInfo(relatedPost.postAuthor);
        }
      },
      (error) => {
        console.error('Error fetching related posts:', error);
      }
    );
  }

  formatRelatedPosts(posts: any[]): any[] {
    return posts.map((post) => ({
      ...post,
      postTime: this.formatDate(post.postTime.toDate()), // Format postTime field
      authorFullName: this.userFullNames[post.postAuthor], // Assign author's full name
    }));
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

  closeModal() {
    this.modalController.dismiss();
  }
}