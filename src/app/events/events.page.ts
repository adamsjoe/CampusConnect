import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { EventModalComponent } from '../event-modal/event-modal.component';

@Component({
  selector: 'app-events',
  templateUrl: './events.page.html',
  styleUrls: ['./events.page.scss'],
})
export class EventsPage {
  highlightedDates = [
    {
      date: '2024-01-05',
      textColor: '#800080',
      backgroundColor: '#ffc0cb',
      desc: 'Something happened on this day',
      type: 'general annoucement',
    },
    {
      date: '2024-01-10',
      textColor: '#09721b',
      backgroundColor: '#c8e5d0',
      desc: 'Something else happened on this day',
      type: 'department annoucement',
    },
    {
      date: '2024-01-20',
      textColor: 'var(--ion-color-secondary-contrast)',
      backgroundColor: 'var(--ion-color-secondary)',
      desc: 'Something amazing happened on this day',
      type: 'war annoucement',
    },
    {
      date: '2024-01-23',
      textColor: 'rgb(68, 10, 184)',
      backgroundColor: 'rgb(211, 200, 229)',
      desc: 'Something should have happened on this day',
      type: 'mystery annoucement',
    },
  ];

  constructor(private modalController: ModalController) {}

  async dateSelected(event: CustomEvent) {
    const selectedDate = event.detail.value;
    const matchingDate = this.highlightedDates.find(
      (date) => date.date === selectedDate
    );

    if (matchingDate) {
      // Open modal here
      const modal = await this.modalController.create({
        component: EventModalComponent,
        componentProps: {
          // Pass any data you need to the modal
          date: matchingDate.date,
          textColor: matchingDate.textColor,
          backgroundColor: matchingDate.backgroundColor,
          desc: matchingDate.desc,
          type: matchingDate.type,
        },
      });
      await modal.present();
    }
  }
}
