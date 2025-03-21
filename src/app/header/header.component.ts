import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faDog } from '@fortawesome/free-solid-svg-icons';
import { AuthenticationService } from '../services/authentication/authentication.service';

@Component({
  selector: 'fsd-header',
  standalone: true,
  imports: [FontAwesomeModule, NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  faDog = faDog;
  authenticationService: AuthenticationService = inject(AuthenticationService);
}
