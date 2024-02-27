import { Component } from '@angular/core';
import { PostsService } from '../services/posts.service';
import { UserService } from '../services/currentUser.service';
import { ModalController } from '@ionic/angular';
import { NewPostModalComponent } from '../new-post-modal/new-post-modal.component';
import { ModalConversationComponent } from '../modal-conversation/modal-conversation.component';

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
    private modalController: ModalController
  ) {
    const user = this.userService.getUser();
    console.log('you are : ', user); // remove me soon

    posts.getPosts().subscribe((data) => {
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
