import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { EventsService } from 'src/app/services/events.service';
import { Timestamp } from 'firebase/firestore';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { UserService } from '../../services/currentUser.service';
import { GroupsService } from '../../services/groups.service';
@Component({
  selector: 'app-add-event-modal',
  templateUrl: './add-event-modal.component.html',
  styleUrls: ['./add-event-modal.component.scss'],
})
export class AddEventModalComponent implements OnInit {
  eventTitle: string = '';
  eventDescription: string = '';
  eventLocation: string = '';
  postType: string = '';
  joinedGroups: any[] = [];
  @ViewChild('dateTimePicker') dateTimePicker: any;

  constructor(
    private newEventModal: ModalController,
    private eventsService: EventsService,
    private userService: UserService,
    private groupsService: GroupsService
  ) {}

  ngOnInit(): void {
    this.fetchJoinedGroups();
  }
  /**
   * Close the modal
   */
  dismissModal() {
    this.newEventModal.dismiss();
  }

  async openGallery() {
    try {
      const result = await Filesystem.readdir({
        path: 'photos', // Use 'photos' directory to access the photo gallery
      });

      // Handle the list of files obtained from the photo gallery
      console.log('Files in photo gallery:', result.files);
    } catch (error) {
      console.error('Error accessing photo gallery:', error);
    }
  }

  async openGallery2() {
    try {
      const image = await Camera.getPhoto({
        source: CameraSource.Photos, // Use 'Photos' directly for the photo gallery
        quality: 100,
        allowEditing: false,
        resultType: CameraResultType.Uri, // Use 'Uri' directly for the URI result type
      });

      // Handle the selected image
      console.log('Selected Image:', image);
    } catch (error) {
      console.error('Error opening gallery:', error);
    }
  }

  /**
   * Get the list of groups this user has joined
   */
  async fetchJoinedGroups() {
    console.log('xj1');
    const userId = this.userService.getUser();

    this.groupsService.getUserJoinedGroups(userId).subscribe(
      (groups: any[]) => {
        const groupIds = groups.map((group) => group.groupId);
        this.groupsService.getJoinedGroupNames(groupIds).subscribe(
          (groupNames: any[]) => {
            this.joinedGroups = groupNames;
            console.log('event joined groups ', this.joinedGroups);
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
   * Create the event object and then call the event service to add this to firestore
   */
  insertEvent() {
    const selectedTimeString = this.dateTimePicker.value;
    const selectedTime = new Date(selectedTimeString);

    this.groupsService.getGroupColour(this.postType).subscribe((col) => {
      console.log('col is ', col);
      const event = {
        eventDate: Timestamp.fromDate(selectedTime),
        eventDesc: this.eventDescription,
        eventTitle: this.eventTitle,
        eventLocation: this.eventLocation,
        backgroundColor: col,
      };

      this.eventsService
        .insertEvent(event)
        .then(() => {
          console.log('whopee');
          this.dismissModal();
        })
        .catch((error) => {
          console.error('Error adding event: ', error);
        });
    });
  }
}
