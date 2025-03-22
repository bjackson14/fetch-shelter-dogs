import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faDog } from '@fortawesome/free-solid-svg-icons';
import { AuthenticationService } from '../services/authentication/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'fsd-header',
  standalone: true,
  imports: [FontAwesomeModule, NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  faDog = faDog;
  authenticationService: AuthenticationService;

  constructor(private router: Router) {
    this.authenticationService = inject(AuthenticationService);
  }

  logout() {
    this.authenticationService.logout()
      .subscribe(() => {
        this.router.navigate(['']);
      });
  }
}
