import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GlobalConst } from '../../../common/global-const';
import { Subscription } from 'rxjs';
import { HotelService } from '../hotel.service';
import { SearchResultModel, GetLocationDetailModel, GetDisplayPositionLocationDetailModel } from '../hotel-result.model';
@Component({
  selector: 'app-hotel-search',
  templateUrl: './hotel-search.component.html',
  styleUrls: ['./hotel-search.component.scss']
})
export class HotelSearchComponent implements OnInit, OnDestroy {
  @Output() selectedLatLngFromResult = new EventEmitter<GetDisplayPositionLocationDetailModel>();
  @Output() updateRadius = new EventEmitter<number>();
  searchForm: FormGroup;
  searchSubscribe: Subscription;
  searchResult: SearchResultModel[] = [];
  config: any = { class: 'search-result-suggestion', placeholder: 'Query', sourceField: 'label' };
  selectedLatLong: GetDisplayPositionLocationDetailModel;
  constructor(private formBuilder: FormBuilder, private hotelService: HotelService) { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.searchForm = this.formBuilder.group({
      query: ['', [Validators.required]],
      radius: [GlobalConst.DefaultRadius, [Validators.required, Validators.min(1)]]
    });

    this.searchForm.controls['radius'].valueChanges.subscribe(value => {
      this.changeRadius(value);
    });
  }

  changeRadius(event) {
    this.updateRadius.emit(event);
  }

  onSelect(item: SearchResultModel) {
    this.getLocationDetail(item.locationId);
  }


  onSearch(term: string) {
    if (this.searchSubscribe) {
      this.searchSubscribe.unsubscribe();
    }
    this.searchSubscribe = this.hotelService.loadSuggestion(term).subscribe((data) => {
      if (data.hasOwnProperty('suggestions')) {
        // tslint:disable-next-line: no-string-literal
        this.searchResult = data['suggestions'];
      }
    }, err => {
      console.error(err);
    });
  }

  getLocationDetail(locationId) {
    if (this.searchSubscribe) {
      this.searchSubscribe.unsubscribe();
    }
    this.searchSubscribe = this.hotelService.getLocationDetail(locationId).subscribe((data) => {
      if (data.hasOwnProperty('response')) {
        const newData = new GetLocationDetailModel(data['response']);
        if (newData.view.length > 0 && newData.view[0].result.length > 0) {
          this.selectedLatLong = new GetDisplayPositionLocationDetailModel(newData.view[0].result[0].location.displayPosition);
          this.selectedLatLngFromResult.emit(this.selectedLatLong);
        }
      }
    }, err => {
      console.error(err);
    });
  }

  ngOnDestroy() {
    if (this.searchSubscribe) {
      this.searchSubscribe.unsubscribe();
    }
  }
}
