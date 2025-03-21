import { Injectable } from '@angular/core';
import { Credentials } from '../../interfaces/credentials';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class LoginService {
  private baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = 'https://frontend-take-home-service.fetch.com';
  }

  // Uses credentials to login to application
  login(credentials: Credentials) {
    const loginUrl = this.baseUrl + '/auth/login';
    return this.http.post(loginUrl, credentials, {
      observe: 'response',
      responseType: 'text'
    });
  }
}
