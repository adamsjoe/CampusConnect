import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UserService } from '../../services/currentUser.service';
import { PhotoService } from '../../services/photo.service';
import { GroupsService } from '../../services/groups.service';

@Component({
  selector: 'app-new-post-modal',
  templateUrl: './new-post-modal.component.html',
  styleUrls: ['./new-post-modal.component.scss'],
})
export class NewPostModalComponent implements OnInit {
  postTitle: string = '';
  postMessage: string = '';
  postType: string = '';
  postParentPost: string = '';
  postImages: any;
  joinedGroups: any[] = [];

  constructor(
    private newPostModal: ModalController,
    private userService: UserService,
    public photoService: PhotoService,
    private groupsService: GroupsService
  ) {}

  ngOnInit(): void {
    this.fetchJoinedGroups();
  }

  /**
   * Get the list of groups this user has joined
   */
  async fetchJoinedGroups() {
    const userId = this.userService.getUser();

    this.groupsService.getUserJoinedGroups(userId).subscribe(
      (groups: any[]) => {
        const groupIds = groups.map((group) => group.groupId);
        this.groupsService.getJoinedGroupNames(groupIds).subscribe(
          (groupNames: any[]) => {
            this.joinedGroups = groupNames;
            console.log('joined groups ', this.joinedGroups);
          },
          (error) => {
            console.error('Error fetching joined group names:', error);
          }
        );
      },
      (error: any) => {
        console.error('Error fetching joined groups:', error);
      }
    );
  }

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
