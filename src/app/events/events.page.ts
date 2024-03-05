import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { EventModalComponent } from '../event-modal/event-modal.component';
import { EventsService } from '../services/events.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.page.html',
  styleUrls: ['./events.page.scss'],
})
export class EventsPage implements OnInit {
  dates: any[] = [];
  highlightedDates: any[] = [];
  currentDate: string = '';

  constructor(
    private modalController: ModalController,
    private eventsService: EventsService
  ) {
    this.getAllEvents();
  }

  ngOnInit(): void {
    // get the current date - will use this in the datetime component
    const today = new Date();

    this.currentDate = this.eventsService.formatDate(new Date());

    this.eventsService.getAllEvents().subscribe((data) => {
      this.dates = data;
      console.log('dates ', this.dates);
      this.highlightedDates = this.dates;
    });
  }

  async getAllEvents() {
    console.log('hi');
    // const stuff = this.eventsService.getAllEvents();
    // console.log('xx ', stuff, 'xx');
  }

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
