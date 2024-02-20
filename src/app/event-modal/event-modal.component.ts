import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-event-modal',
  templateUrl: './event-modal.component.html',
  styleUrls: ['./event-modal.component.scss'],
})
export class EventModalComponent {
  @Input() date: string = '';
  @Input() textColor: string = '';
  @Input() backgroundColor: string = '';
  @Input() desc: string = '';
  @Input() type: string = '';

  constructor(private modalController: ModalController) {}

  dismiss() {
    this.modalController.dismiss();
  }

  reverseDate(dateString: string): string {
    if (!dateString) {
      return '';
    }

    const parts = dateString.split('-');
    if (parts.length !== 3) {
      return dateString;
    }

    return parts.reverse().join('-');
  }
}
