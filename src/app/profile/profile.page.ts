import { Component, OnInit } from '@angular/core';
import { firebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage {
  aboutInfo: any;
  constructor(private firbaseService: firebaseService) {
    firbaseService.getAboutInfo().subscribe((data) => {
      this.aboutInfo = data;
    });
  }
}
