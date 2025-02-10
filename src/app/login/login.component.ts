import { Component } from '@angular/core';
import { LoginService } from '../services/login/login.service';
import { Credentials } from '../interfaces/credentials';
import { Router } from '@angular/router';

@Component({
  selector: 'login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private credentials: Credentials;

  constructor( private loginService: LoginService, private router: Router) {
    this.credentials = {
      name: '',
      email: ''
    }
  }

  login(name: string, email: string) : void {
    this.credentials.name = name;
    this.credentials.email = email;
    this.loginService.login(this.credentials)
      .subscribe(() => this.router.navigate(['/search']));
  }
}
