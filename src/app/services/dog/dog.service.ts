import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DogsSearchResponse } from '../../interfaces/responses';
import { Dog } from '../../interfaces/Dog';
import { HttpOptions } from '../../interfaces/http-options';

@Injectable({
  providedIn: 'root'
})
export class DogService {
  private baseUrl: string;
  private httpOptions: HttpOptions;

  constructor(private http: HttpClient) {
    this.baseUrl = 'https://frontend-take-home-service.fetch.com';
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      withCredentials: true
    }
  }

  getDogIds(page?: string): Observable<DogsSearchResponse> {
    const url = this.baseUrl + (page ? page : '/dogs/search');
    return this.http.get<DogsSearchResponse>(url, this.httpOptions);
  }

  getDogs(ids: Array<string>): Observable<Dog[]> {
    const url = this.baseUrl + '/dogs';
    return this.http.post<Dog[]>(url, ids, this.httpOptions);
  }
}
