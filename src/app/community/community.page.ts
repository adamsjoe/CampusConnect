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
  user: any;

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

  fetchAllGroups() {
    this.groups.getAllGroups().subscribe((data) => {
      this.allGroups = data;
    });
  }

  // Check if the user has joined the group
  isUserJoinedGroup(groupId: string): boolean {
    return this.userJoinedGroups.includes(groupId);
  }

  joinGroup(groupId: string) {
    console.log('join 1');
    console.log('group id is: ', groupId);
    const user = this.userService.getUser();
    // Add the entry to joinedGroups table
    this.groups.joinGroup(user, groupId).subscribe(() => {
      // Update the list of groups after joining
      this.fetchAllGroups();
    });
  }

  leaveGroup(groupId: string) {
    const user = this.userService.getUser();
    console.log('leave 1');
    console.log('group id is: ', groupId);

    // Remove the entry from joinedGroups table
    this.groups
      .leaveGroup(user, groupId)
      .then(() => {
        // Update the list of groups after leaving
        this.fetchAllGroups();
      })
      .catch((error) => {
        console.error('Error leaving group:', error);
      });
  }
}
