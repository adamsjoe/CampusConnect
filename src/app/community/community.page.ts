import { Component, OnInit } from '@angular/core';
import { GroupsService } from '../services/groups.service';
import { UserService } from '../services/currentUser.service';

@Component({
  selector: 'app-community',
  templateUrl: './community.page.html',
  styleUrls: ['./community.page.scss'],
})
export class CommunityPage {
  allGroups: any;
  constructor(private groups: GroupsService, private userService: UserService) {
    const user = this.userService.getUser();

    groups.getAllGroups().subscribe((data) => {
      this.allGroups = data;
    });
  }
}
