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
  searchQuery: string = '';
  filteredGroups: any;

  constructor(
    private groups: GroupsService,
    private userService: UserService
  ) {}

  ngOnInit() {
    // Fetch all groups
    this.groups.getAllGroups().subscribe((data) => {
      this.allGroups = data;

      // Initialize filteredGroups with all groups
      this.filteredGroups = [...this.allGroups];

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

  filterGroups() {
    if (!this.searchQuery) {
      console.log('search empty');
      this.filteredGroups = [...this.allGroups]; // Reset filteredGroups if searchQuery is empty
      return;
    }

    const lowerCaseQuery = this.searchQuery.toLowerCase();
    console.log('lower case query ', lowerCaseQuery);
    this.filteredGroups = this.allGroups.filter((group: any) => {
      return (
        group.groupName.toLowerCase().includes(lowerCaseQuery) ||
        group.groupDesc.toLowerCase().includes(lowerCaseQuery)
      );
    });
  }
}
