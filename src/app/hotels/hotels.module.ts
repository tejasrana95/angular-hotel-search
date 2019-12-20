import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HotelListComponent } from './hotel-list/hotel-list.component';
import { Routes, RouterModule } from '@angular/router';
import { HereMapModule } from '../here-map/here-map.module';
import { NgxGeoCoordinatesInfoModule } from 'ngx-geo-info-angular';
import { RatingModule } from '../rating/rating.module';
import { HotelSearchComponent } from './hotel-search/hotel-search.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HotelService } from './hotel.service';
import { AutocompleteModule } from 'ng2-input-autocomplete';

const appRoutes: Routes = [
  {
    path: '**',
    component: HotelListComponent
  }
];

@NgModule({
  declarations: [HotelListComponent, HotelSearchComponent],
  imports: [
    CommonModule,
    HereMapModule,
    RouterModule.forChild(appRoutes),
    NgxGeoCoordinatesInfoModule,
    RatingModule,
    FormsModule, ReactiveFormsModule,
    HttpClientModule,
    AutocompleteModule
  ],
  providers: [HotelService]
})
export class HotelsModule { }
