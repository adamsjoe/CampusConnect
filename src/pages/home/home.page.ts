import { Component } from '@angular/core';
import { PostsService } from '../../app/services/posts.service';
import { UserService } from '../../app/services/currentUser.service';
import { ModalController } from '@ionic/angular';
import { NewPostModalComponent } from '../../app/modals/new-post-modal/new-post-modal.component';
import { ModalConversationComponent } from '../../app/modals/modal-conversation/modal-conversation.component';
import { GroupsService } from '../../app/services/groups.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  allPosts: any;
  postsService: any;

  constructor(
    private posts: PostsService,
    private userService: UserService,
    private modalController: ModalController,
    private groupsService: GroupsService
  ) {
    this.fetchPosts();
  }

  async fetchPosts() {
    const user = this.userService.getUser();
    this.posts.getPosts().subscribe((data) => {
      // Filter only those posts which have no ParentPost
      const filteredPosts = data.filter((post: any) => !post.postParentPost);

      /// Map and format the filtered posts
      // (we will truncate the post if the post is more than 100 characters )
      this.allPosts = filteredPosts.map(
        (post: { postTime: { toDate: () => any }; postMessage: any }) => {
          const truncatedMessage =
            post.postMessage.length > 100
              ? post.postMessage.substring(0, 100) + '...(more)'
              : post.postMessage;

          return {
            ...post,
            postTime: this.formatDate(post.postTime.toDate()),
            postMessage: truncatedMessage,
          };
        }
      );

      // Now fetch groupCol values for each post
      this.fetchGroupColForPosts();
      console.log('post is ', this.allPosts);
    });
  }

  // get the colour from group.groupCol
  async fetchGroupColForPosts() {
    const postTypeIds = this.allPosts.map((post: any) => post.postType);
    this.groupsService.getGroupCol(postTypeIds).subscribe((groupCols) => {
      // Merge groupCol values with posts
      this.allPosts.forEach((post: any, index: number) => {
        post.groupColour = groupCols[index]?.groupCol || ''; // Assign groupCol to each post
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

  // insert a new post to firestore - hope no go boom
  async insertPost() {
    const user = this.userService.getUser();
    const postDate = new Date();

    const modal = await this.modalController.create({
      component: NewPostModalComponent,
    });
    await modal.present();

    const { data } = await modal.onDidDismiss();
    if (data) {
      console.log('hello');
      console.log('data is ', data);
      this.posts.insertPost(data);
    }
  }

  openConversationModal(post: any) {
    console.log('opening the modal with post id ', post);
    // Open the modal and pass the post data to it
    this.modalController
      .create({
        component: ModalConversationComponent,
        componentProps: {
          post: post,
        },
      })
      .then((modal) => modal.present());
  }
}
