import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalConst } from 'src/common/global-const';

@Injectable({
  providedIn: 'root'
})
export class HotelService {

  constructor(private httpClient: HttpClient) { }

  loadSuggestion(query) {
    return this.httpClient.get(`https://autocomplete.geocoder.ls.hereapi.com/6.2/suggest.json?query=${encodeURIComponent(query)}
    &apikey=${GlobalConst.HereAppKey}
    &maxresults=5`);
  }

  getLocationDetail(locationId) {
    return this.httpClient.get(`https://geocoder.ls.hereapi.com/6.2/geocode.json?locationid=${encodeURIComponent(locationId)}
    &apikey=${GlobalConst.HereAppKey}
    &jsonattributes=1`);
  }
}
