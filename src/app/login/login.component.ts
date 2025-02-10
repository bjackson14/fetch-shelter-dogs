import { Component } from '@angular/core';
import { LoginService } from '../services/login/login.service';
import { Credentials } from '../interfaces/credentials';

@Component({
  selector: 'login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private credentials: Credentials;

  constructor( private loginService: LoginService) {
    this.credentials = {
      name: '',
      email: ''
    }
  }

  login(name: string, email: string) : void {
    this.credentials.name = name;
    this.credentials.email = email;
    this.loginService.login(this.credentials)
      .subscribe(data => console.log(data));
  }
}
