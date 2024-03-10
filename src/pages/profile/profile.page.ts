import { Component, OnInit } from '@angular/core';
import { aboutAppService } from '../../app/services/aboutApp.service';
import { profileService } from '../../app/services/profile.service';
import { UserService } from '../../app/services/currentUser.service';
import { InstitutionsService } from '../../app/services/institutions.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage {
  aboutInfo: any;
  UserService: any;
  profileInfo: any;

  constructor(
    private aboutApp: aboutAppService,
    profiles: profileService,
    private userService: UserService,
    private institutionService: InstitutionsService
  ) {
    aboutApp.getAboutInfo().subscribe((data) => {
      this.aboutInfo = data;
    });
    const user = this.userService.getUser();

    profiles.getProfileInfo(user).subscribe((data) => {
      this.profileInfo = data;

      console.log('user data', data);
      // if there is no image, replace with a default
      if (data.profilePic === '') {
        data.profilePic = 'assets/img/missingImage.png';
      }

      // if there is no institution, replace with a default
      if (data.institution === '') {
        data.institution = 'None on file - fake student!';
      } else {
        // otherwise, call the service to get the data from firestore
        this.institutionService
          .getInstitutionInfo(this.profileInfo.institution)
          .subscribe(
            (institutionData) => {
              if (institutionData && institutionData.instName) {
                this.profileInfo.institution = institutionData.instName;
              } else {
                console.error('Institution data or instName not found');
              }
            },
            (error) => {
              console.error('Error fetching institution info:', error);
            }
          );
      }
    });
  }
}
