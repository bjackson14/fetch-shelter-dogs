import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DogsSearchResponse } from '../../interfaces/dog-search-response';
import { Dog } from '../../interfaces/dog';
import { HttpOptions } from '../../interfaces/http-options';
import { Match } from '../../interfaces/match';

@Injectable({
  providedIn: 'root'
})
export class DogService {
  private baseUrl: string;
  private httpOptions: HttpOptions;

  constructor(private http: HttpClient) {
    this.baseUrl = 'https://frontend-take-home-service.fetch.com';
    this.httpOptions = {
      withCredentials: true
    }
  }

  getDogIds(sortOrder: string, selectedBreed?: string, page?: string): Observable<DogsSearchResponse> {
    const url = this.baseUrl + (page ? page : '/dogs/search');
    let options: HttpOptions = {...this.httpOptions};
    let params = new HttpParams();
    if (!page) {
      params = params.set('sort', `breed:${sortOrder}`);
    }
    if (selectedBreed) {
      params = params.set('breeds', selectedBreed);
    }
    options.params = params;
    return this.http.get<DogsSearchResponse>(url, options);
  }

  getDogs(ids: Array<string>): Observable<Dog[]> {
    const url = this.baseUrl + '/dogs';
    return this.http.post<Dog[]>(url, ids, this.httpOptions);
  }

  getDogBreeds(): Observable<string[]> {
    const url = this.baseUrl + '/dogs/breeds';
    return this.http.get<string[]>(url, this.httpOptions);
  }

  getMatch(favorites: string[]): Observable<Match> {
    const url = this.baseUrl + '/dogs/match';
    return this.http.post<Match>(url, favorites, this.httpOptions);
  }
}
