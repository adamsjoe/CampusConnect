import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-add-event-modal',
  templateUrl: './add-event-modal.component.html',
  styleUrls: ['./add-event-modal.component.scss'],
})
export class AddEventModalComponent {
  eventTitle: string = '';

  constructor(private newEventModal: ModalController) {}

  /**
   * Close the modal
   */
  dismissModal() {
    this.newEventModal.dismiss();
  }
}
