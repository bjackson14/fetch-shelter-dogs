import { Component, inject } from '@angular/core';
import { AuthenticationService } from '../services/authentication/authentication.service';
import { Credentials } from '../interfaces/credentials';
import { Router } from '@angular/router';
import { NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'fsd-login',
  standalone: true,
  imports: [NgClass, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private credentials: Credentials;
  private authenticationService: AuthenticationService;
  hasNameError: boolean;
  hasEmailError: boolean;
  statusError: boolean;

  constructor(private router: Router) {
    this.authenticationService = inject(AuthenticationService);
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
    this.authenticationService.login(this.credentials)
      .subscribe(data => {
        if (data) {
          this.router.navigate(['/search'])
        } else {
          this.statusError = true;
        }
      });
  }
}
