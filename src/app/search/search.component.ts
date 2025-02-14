import { Component, OnInit } from '@angular/core';
import { DogService } from '../services/dog/dog.service';
import { Dog } from '../interfaces/dog';
import { NgClass, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms'

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [NgFor, NgClass, FormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {
  nextDogEndPoint: string;
  prevousDogEndPoint: string;
  dogs: Dog[];
  sortOrder: string;
  selectedBreed: string;
  breeds: string[];
  favorites: string[];

  constructor(private dogService: DogService ) {
    this.nextDogEndPoint = '';
    this.prevousDogEndPoint = ''
    this.dogs = [];
    this.sortOrder = 'asc';
    this.selectedBreed = '';
    this.breeds = [];
    this.favorites = [];
  }

  ngOnInit(): void {
    this.getDogData();
    this.getDogBreeds();
  }

  // Gets the ids for all the dogs and uses them to populate the dogs array
  getDogData(page?: string): void {
    this.dogService.getDogIds(this.sortOrder, this.selectedBreed, page)
      .subscribe(res => {

        // Sets the end point for the next and previous set of ids
        // These are used in the html template when navigating the
        // paginated list
        this.nextDogEndPoint = res.next;
        this.prevousDogEndPoint = res.prev;

        // Uses ids from response to populate the dogs array with
        // all relevant information
        this.populateDogArray(res.resultIds);
      });
  }

  // Uses the array of dog ids to get all the relevant information
  // and sets it to the dogs array
  private populateDogArray(dogIds: string[]): void {
    this.dogService.getDogs(dogIds)
      .subscribe(res => {
        this.dogs = res;

        // Scrolls to top when new list has been created
        window.scrollTo(0, 0);
      })
  }

  // Gets all the dog breeds and sets them into the brreds array
  private getDogBreeds(): void {
    this.dogService.getDogBreeds()
      .subscribe(res => this.breeds = res);
  }

  getMatch(): void {
    this.dogService.getMatch(this.favorites)
      .subscribe(res => console.log(res));
  }

  // Sets the sort order and gets a new list of sorted dogs
  setSortOrder(event: Event): void {
    this.sortOrder = (event.target as HTMLSelectElement).value;
    this.getDogData();
  }

  // Filters the dog list bt breed
  setFilterByBreed(event: Event): void {
    this.selectedBreed = (event.target as HTMLSelectElement).value;
    this.getDogData();
  }

  // Adds of removes a dog id from the favorites array
  addOrRemoveFavoriteDog(id: string): void {
    if (this.favorites.includes(id)) {
      this.favorites = this.favorites.filter(dogId => dogId !== id)
    } else {
      this.favorites.push(id);
    }
  }
}
