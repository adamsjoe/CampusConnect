import { Component } from '@angular/core';
import { PostsService } from '../services/posts.service';
import { UserService } from '../services/currentUser.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
})
export class TabsPage {
  unreadPosts: any;
  constructor(private posts: PostsService, private userService: UserService) {
    const userId = this.userService.getUser();

    posts.getUnreadPosts(userId).subscribe((data) => {
      this.unreadPosts = data;
    });
  }
}
