import { Component, OnInit } from '@angular/core';
import { DogService } from '../services/dog/dog.service';
import { Dog } from '../interfaces/Dog';
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
  nextDogIds: string;
  prevousDogIds: string;
  dogs: Dog[];
  sortOrder: string;

  constructor(private dogService: DogService ) {
    this.nextDogIds = '';
    this.prevousDogIds = ''
    this.dogs = [];
    this.sortOrder = 'asc';
  }

  ngOnInit(): void {
    this.getDogData();
  }

  getDogData(page?: string): void {
    this.dogService.getDogIds(this.sortOrder, page)
      .subscribe(res => {
        this.nextDogIds = res.next;
        this.prevousDogIds = res.prev;
        this.populateDogArray(res.resultIds);
      });
  }

  private populateDogArray(dogIds: string[]): void {
    this.dogService.getDogs(dogIds)
      .subscribe(res => {
        this.dogs = res;
        window.scrollTo(0, 0);
      })
  }

  setSortOrder(event: Event): void {
    this.sortOrder = (event.target as HTMLSelectElement).value;
    this.getDogData();
  }
}
