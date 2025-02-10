import { Injectable } from '@angular/core';
import { Credentials } from '../../interfaces/credentials';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class LoginService {
  private baseUrl = 'https://frontend-take-home-service.fetch.com';
  private loginEndpoint = '/auth/login';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
    withCredentials: true
  }

  constructor(private http: HttpClient) {}

  // Uses credentials to login to application
  login(credentials: Credentials) {
    const loginUrl = this.baseUrl + this.loginEndpoint;
    return this.http.post(loginUrl, credentials, {
      ...this.httpOptions,
      observe: 'response',
      responseType: 'text'
    });
  }
}
