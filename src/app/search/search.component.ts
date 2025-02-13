import { Component, OnInit } from '@angular/core';
import { DogService } from '../services/dog/dog.service';
import { Dog } from '../interfaces/Dog';
import { NgClass, NgFor } from '@angular/common';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [NgFor, NgClass],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {
  nextDogIds: string;
  prevousDogIds: string;
  dogs: Dog[];

  constructor(private dogService: DogService ) {
    this.nextDogIds = '';
    this.prevousDogIds = ''
    this.dogs = [];
  }

  ngOnInit(): void {
    this.getDogData();
  }

  getDogData(page?: string) {
    this.dogService.getDogIds(page)
      .subscribe(res => {
        this.nextDogIds = res.next;
        this.prevousDogIds = res.prev;
        this.populateDogArray(res.resultIds);
      });
  }

  private populateDogArray(dogIds: string[]) {
    this.dogService.getDogs(dogIds)
      .subscribe(res => {
        this.dogs = res;
        window.scrollTo(0, 0);
      })
  }
}
