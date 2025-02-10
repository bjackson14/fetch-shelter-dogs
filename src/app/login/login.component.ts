import { Component } from '@angular/core';
import { LoginService } from '../services/login/login.service';
import { Credentials } from '../interfaces/credentials';
import { Router } from '@angular/router';
import { NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'login',
  standalone: true,
  imports: [NgClass, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private credentials: Credentials;
  hasNameError: boolean;
  hasEmailError: boolean;
  statusError: boolean;

  constructor( private loginService: LoginService, private router: Router) {
    this.credentials = {
      name: '',
      email: ''
    }
    this.hasNameError = false;
    this.hasEmailError = false;
    this.statusError = false;
  }

  // Checks for errors and logs in to applocation
  login(name: string, email: string) : void {
    // Resets error booleans
    this.hasNameError = false;
    this.hasEmailError = false;
    this.statusError = false;

    // Checks if name and email fields are entered
    //If not entered, set error variable to true and exit method
    if (!name) {
      this.hasNameError = true;
      return;
    }
    if (!email) {
      this.hasEmailError = true;
      return;
    }

    // Sets name and email to credentials and calls login service
    // If the login is sucessful, the route to search page
    // Otherwise display error
    this.credentials.name = name;
    this.credentials.email = email;
    this.loginService.login(this.credentials)
      .subscribe(data => {
        console.log(data)
        if (data.status === 200) {
          this.router.navigate(['/search'])
        } else {
          this.statusError = true;
        }
      });
  }
}
