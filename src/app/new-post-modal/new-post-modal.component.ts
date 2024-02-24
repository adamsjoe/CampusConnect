import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UserService } from '../services/currentUser.service';

@Component({
  selector: 'app-new-post-modal',
  templateUrl: './new-post-modal.component.html',
  styleUrls: ['./new-post-modal.component.scss'],
})
export class NewPostModalComponent {
  postTitle: string = '';
  postMessage: string = '';
  postType: string = '';

  constructor(
    private newPostModal: ModalController,
    private userService: UserService
  ) {}

  dismissModal() {
    this.newPostModal.dismiss();
  }

  displayNewPostModal() {
    const post = {
      postTitle: this.postTitle,
      postMessage: this.postMessage,
      postType: this.postType,
      postTime: new Date(),
      postAuthor: this.userService.getUser(),
    };

    console.log('post is ', post);
    this.newPostModal.dismiss(post);
  }
}
