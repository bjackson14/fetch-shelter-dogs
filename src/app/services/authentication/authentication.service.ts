import { Injectable, signal, WritableSignal } from '@angular/core';
import { Credentials } from '../../interfaces/credentials';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
  private baseUrl: string;
  isLoggedIn: WritableSignal<boolean>;

  constructor(private http: HttpClient) {
    this.baseUrl = 'https://frontend-take-home-service.fetch.com';
    this.isLoggedIn = signal(false);
  }

  // Uses credentials to login to application
  login(credentials: Credentials): Observable<boolean> {
    const loginUrl = this.baseUrl + '/auth/login';
    return this.http.post(loginUrl, credentials, {
      observe: 'response',
      responseType: 'text'
    }).pipe(
      map((response: HttpResponse<string>) => {
        if (response.status === 200) {
          this.isLoggedIn.set(true);
          return true;
        }
        return false;
      })
    );
  }
}
