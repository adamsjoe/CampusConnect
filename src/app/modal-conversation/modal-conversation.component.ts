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
  userFullName: string = '';
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
        this.userFullName = `${user.firstName} ${user.lastName}`; // Using firstName and lastName fields
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
        this.relatedPosts = posts;
        console.log('Related posts:', posts);
      },
      (error) => {
        console.error('Error fetching related posts:', error);
      }
    );
  }

  closeModal() {
    this.modalController.dismiss();
  }
}
