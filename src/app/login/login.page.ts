import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email: string = '';
  password: string = '';

  constructor(private router: Router) {}

  ngOnInit() {}

  login() {
    if (this.email === 'user' && this.password === 'password') {
      // Navigate to the home page after successful login
      this.router.navigate(['/home']);
    } else {
      alert('Invalid username or password');
    }
    // const auth = getAuth();
    // signInWithEmailAndPassword(auth, this.email, this.password)
    //   .then((userCredential) => {
    //     // Signed in
    //     const user = userCredential.user;
    //     // ...
    //   })
    //   .catch((error) => {
    //     const errorCode = error.code;
    //     const errorMessage = error.message;
    //   });
  }
}
