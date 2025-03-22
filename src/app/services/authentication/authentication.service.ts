import { Injectable, signal, WritableSignal } from '@angular/core';
import { Credentials } from '../../interfaces/credentials';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { HttpOptions } from '../../interfaces/http-options';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
  private baseUrl: string;
  private httpOptions: HttpOptions;
  isLoggedIn: WritableSignal<boolean>;

  constructor(private http: HttpClient) {
    this.baseUrl = 'https://frontend-take-home-service.fetch.com';
    this.httpOptions = {
      withCredentials: true
    }
    this.isLoggedIn = signal(false);
  }

  // Uses credentials to login to application
  login(credentials: Credentials): Observable<boolean> {
    const loginUrl = this.baseUrl + '/auth/login';
    return this.http.post(loginUrl, credentials, {
      observe: 'response',
      responseType: 'text'
    }).pipe(
      map((res: HttpResponse<string>) => {
        if (res.status === 200) {
          this.isLoggedIn.set(true);
          return true;
        }
        return false;
      })
    );
  }

  // Logs out of application which will invalidate auth cookie
  logout() {
    const logoutUrl = this.baseUrl + '/auth/logout';
    this,this.isLoggedIn.set(false);
    return this.http.post(logoutUrl, null, this.httpOptions); 
  }
}
