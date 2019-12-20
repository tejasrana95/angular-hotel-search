import { Component, OnInit, HostListener, ViewChild, ElementRef } from '@angular/core';
import { NgxGeoCoordinatesInfo } from 'ngx-geo-info-angular';
import { GlobalConst } from '../../../common/global-const';
import { HoteResultModel, GetDisplayPositionLocationDetailModel } from '../hotel-result.model';
@Component({
  selector: 'app-hotel-list',
  templateUrl: './hotel-list.component.html',
  styleUrls: ['./hotel-list.component.scss']
})
export class HotelListComponent implements OnInit {
  lat = GlobalConst.DefaultLat;
  long = GlobalConst.DefaultLong;
  radius = GlobalConst.DefaultRadius;
  hotelList: HoteResultModel[] = [];
  innerHeight = '500px';
  width = '93%';
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.calculateHeight();
  }
  constructor(private geoService: NgxGeoCoordinatesInfo) {
    this.calculateHeight();
  }

  calculateHeight() {
    const height = window.innerHeight;
    this.innerHeight = (height - 140) + 'px';
    if (window.innerWidth <= 1024) {
      this.width = '100%';
    }
  }

  ngOnInit() {
    this.geoService.getAll().then(value => {
      this.lat = value.data.latitude;
      this.long = value.data.longitude;
    }, (err) => {
      console.log(err);
    });
  }

  resultFromMap(data: HoteResultModel[]) {
    this.hotelList = data;
  }

  updateRadius(radius) {
    this.radius = radius;
  }

  resultFromSearch(data: GetDisplayPositionLocationDetailModel) {
    this.lat = data.latitude.toString();
    this.long = data.longitude.toString();
  }

}
