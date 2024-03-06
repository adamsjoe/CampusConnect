import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { environment } from 'src/environments/environment';
import { UserService } from '../services/currentUser.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email: string = '';
  password: string = '';
  UserService: any;

  constructor(private router: Router, private userService: UserService) {}

  login() {
    const app = initializeApp(environment.firebase);
    const auth = getAuth();

    signInWithEmailAndPassword(auth, this.email, this.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;

        this.userService.setUser(user.uid);
        this.router.navigate(['/tabs/home']);
      })
      .catch((error) => {
        alert('Invalid username or password');
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log('error code : ', errorCode);
        console.log('error message : ', errorMessage);
      });
  }

  notDone() {
    alert('Feature not implemented');
  }
}
