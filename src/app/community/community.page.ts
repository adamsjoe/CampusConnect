import { Component, OnInit } from '@angular/core';
import { GroupsService } from '../services/groups.service';
import { UserService } from '../services/currentUser.service';

@Component({
  selector: 'app-community',
  templateUrl: './community.page.html',
  styleUrls: ['./community.page.scss'],
})
export class CommunityPage implements OnInit {
  allGroups: any;
  userJoinedGroups: any[] = []; // Store the groups joined by the user

  constructor(
    private groups: GroupsService,
    private userService: UserService
  ) {}

  ngOnInit() {
    // Fetch all groups
    this.groups.getAllGroups().subscribe((data) => {
      this.allGroups = data;

      // Fetch groups joined by the user
      const user = this.userService.getUser();
      if (user) {
        this.groups.getUserJoinedGroups(user).subscribe((joinedGroups) => {
          // Store the groups joined by the user
          this.userJoinedGroups = joinedGroups.map((group) => group.groupId);
        });
      }
    });
  }

  // Check if the user has joined the group
  isUserJoinedGroup(groupId: string): boolean {
    return this.userJoinedGroups.includes(groupId);
  }
}
