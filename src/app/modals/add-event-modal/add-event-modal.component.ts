import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { EventsService } from 'src/app/services/events.service';
import { Timestamp } from 'firebase/firestore';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
@Component({
  selector: 'app-add-event-modal',
  templateUrl: './add-event-modal.component.html',
  styleUrls: ['./add-event-modal.component.scss'],
})
export class AddEventModalComponent {
  eventTitle: string = '';
  eventDescription: string = '';
  eventLocation: string = '';
  @ViewChild('dateTimePicker') dateTimePicker: any;

  constructor(
    private newEventModal: ModalController,
    private eventsService: EventsService
  ) {}

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
   * Create the event object and then call the event service to add this to firestore
   */
  insertEvent() {
    const selectedTimeString = this.dateTimePicker.value;
    const selectedTime = new Date(selectedTimeString);

    console.log('event Title :', this.eventTitle);
    console.log('event loc :', this.eventLocation);
    console.log('event desc :', this.eventDescription);
    console.log('event date: ', Timestamp.fromDate(selectedTime));

    const event = {
      eventDate: Timestamp.fromDate(selectedTime),
      eventDesc: this.eventDescription,
      eventTitle: this.eventTitle,
      eventLocation: this.eventLocation,
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
  }
}
