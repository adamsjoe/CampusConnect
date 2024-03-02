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
  postImages: any;

  constructor(
    private newPostModal: ModalController,
    private userService: UserService,
    public photoService: PhotoService
  ) {}

  /**
   * Close the modal
   */
  dismissModal() {
    this.newPostModal.dismiss();
  }

  /**
   * Create a new object to hold the data we have entered for this post.
   */
  displayNewPostModal() {
    const post = {
      postTitle: this.postTitle,
      postMessage: this.postMessage,
      postType: this.postType,
      postTime: new Date(),
      postAuthor: this.userService.getUser(),
      postParentPost: '',
      // postImages: undefined,
    };

    console.log('post is ', post);

    // automatially close the post
    this.newPostModal.dismiss(post);
  }

  /**
   * The submit button is disabled unless the user enters at least the following fields
   * Added the trim method as I am the sorta sick person who would enter whitespace to break this.
   */
  isFormValid(): boolean {
    return (
      !!this.postTitle.trim() && !!this.postMessage.trim() && !!this.postType
    );
  }

  addPhotoToGallery() {
    this.photoService.addNewToGallery();
  }
}
