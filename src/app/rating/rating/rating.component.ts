import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnInit {

  ratingValue = 0;
  ratingOutOf = 5;
  @Input()
  set rating(data) {
    this.ratingValue = (data && data !== 0) ? data - 1 : 0;
  }

  constructor() { }

  ngOnInit() {
  }

}
