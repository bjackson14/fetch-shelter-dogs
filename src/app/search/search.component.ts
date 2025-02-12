import { Component, OnInit } from '@angular/core';
import { DogService } from '../services/dog/dog.service';
import { Dog } from '../interfaces/Dog';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [NgFor],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {
  nextDogIds: string;
  dogs: Dog[];

  constructor(private dogService: DogService ) {
    this.nextDogIds = '';
    this.dogs = [];
  }

  ngOnInit(): void {
    this.initializeDogData();
  }

  private initializeDogData() {
    this.dogService.getDogIds(this.nextDogIds)
      .subscribe(res => {
        this.nextDogIds = res.next;
        this.populateDogArray(res.resultIds)
      });
  }

  private populateDogArray(dogIds: string[]) {
    this.dogService.getDogs(dogIds)
      .subscribe(res => this.dogs = res)
  }
}
