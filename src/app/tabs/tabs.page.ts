import { Component } from '@angular/core';
import { PostsService } from '../services/posts.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
})
export class TabsPage {
  unreadPosts: any;
  constructor(private posts: PostsService) {
    posts.getPosts().subscribe((data) => {
      this.unreadPosts = data;
    });
  }
}
