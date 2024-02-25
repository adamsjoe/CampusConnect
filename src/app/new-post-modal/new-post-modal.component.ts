import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UserService } from '../services/currentUser.service';
import { PhotoService } from '../services/photo.service';

@Component({
  selector: 'app-new-post-modal',
  templateUrl: './new-post-modal.component.html',
  styleUrls: ['./new-post-modal.component.scss'],
})
export class NewPostModalComponent {
  postTitle: string = '';
  postMessage: string = '';
  postType: string = '';
  postParentPost: string = '';

  constructor(
    private newPostModal: ModalController,
    private userService: UserService,
    public photoService: PhotoService
  ) {}

  dismissModal() {
    /**
     * Close the modal
     */
    this.newPostModal.dismiss();
  }

  displayNewPostModal() {
    /**
     * Create a new object to hold the data we have entered for this post.
     */
    const post = {
      postTitle: this.postTitle,
      postMessage: this.postMessage,
      postType: this.postType,
      postTime: new Date(),
      postAuthor: this.userService.getUser(),
      postParentPost: '',
    };

    console.log('post is ', post);

    // automatially close the post
    this.newPostModal.dismiss(post);
  }

  isFormValid(): boolean {
    /**
     * The submit button is disabled unless the user enters at least the following fields
     * Added the trim method as I am the sorta sick person who would enter whitespace to break this.
     */
    return (
      !!this.postTitle.trim() && !!this.postMessage.trim() && !!this.postType
    );
  }

  addPhotoToGallery() {
    this.photoService.addNewToGallery();
  }
}
