import { Component, OnInit, ViewChild, ElementRef, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { GlobalConst } from 'src/common/global-const';
import { HoteResultModel } from 'src/app/hotels/hotel-result.model';
declare var H: any;

@Component({
  selector: 'app-here-map',
  templateUrl: './here-map.component.html',
  styleUrls: ['./here-map.component.scss']
})
export class HereMapComponent implements OnInit, AfterViewInit {

  @ViewChild('map', { static: true }) mapElement: ElementRef;
  @Output() resultFromMap = new EventEmitter<HoteResultModel[]>();
  lat = GlobalConst.DefaultLat;
  lng = GlobalConst.DefaultLong;
  radius = GlobalConst.DefaultRadius;

  @Input()
  public width: any;

  @Input()
  public height: any;

  private platform: any;
  private map: any;

  private ui: any;
  private search: any;
  defaultLayers: any;
  bubble;
  @Input()
  set geoData(data) {
    if (data.lat && data.long) {
      this.lat = data.lat;
      this.lng = data.long;
      setTimeout(() => {
        this.removeObjects();
        setTimeout(() => {
          this.addCircleToMap();
          this.updateMap(this.lat, this.lng);
          this.geocode(this.platform);
        }, 2);
      }, 1);
    }
  }

  @Input()
  set updateRadius(data) {
    if (data > 0) {
      setTimeout(() => {
        this.radius = data;
        this.removeObjects();
        setTimeout(() => {
          this.addCircleToMap();
          this.updateMap(this.lat, this.lng);
          this.geocode(this.platform);
        }, 2);
      }, 1);
    }
  }

  public constructor() {
    this.platform = new H.service.Platform({
      apikey: GlobalConst.HereAppKey,
    });
    this.defaultLayers = this.platform.createDefaultLayers();
  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.initMap();
  }

  initMap() {
    this.map = new H.Map(
      this.mapElement.nativeElement,
      this.defaultLayers.vector.normal.map,
      {
        zoom: GlobalConst.DefaultZoom,
        center: { lat: this.lat, lng: this.lng }
      }
    );
    const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(this.map));
    this.ui = H.ui.UI.createDefault(this.map, this.defaultLayers);
  }

  updateMap(lat, lng) {
    this.map.setCenter({ lat, lng });
  }

  openBubble(position, text) {
    if (!this.bubble) {
      this.bubble = new H.ui.InfoBubble(
        position,
        { content: text });
      this.ui.addBubble(this.bubble);
    } else {
      this.bubble.setPosition(position);
      this.bubble.setContent(text);
      this.bubble.open();
    }
  }

  removeObjects() {
    if (this.map && this.map.getObjects()) {
      const allobjects = this.map.getObjects();
      allobjects.forEach((object, index) => {
        this.map.removeObject(allobjects[index]);
      });
    }
  }

  addCircleToMap() {
    this.map.addObject(new H.map.Circle(
      { lat: this.lat, lng: this.lng },
      this.radius,
      {
        style: {
          strokeColor: 'rgba(55, 85, 170, 0.2)',
          lineWidth: 1,
          fillColor: 'rgba(0, 128, 0, 0.2)'
        }
      }
    ));
  }

  geocode(platform) {
    const geocoder = platform.getPlacesService();
    geocoder.explore({
      in: `${this.lat},${this.lng};` + `r=${this.radius}`,
      cat: 'hotel'
    }, (results) => {
      this.onSuccess(results);
    }, err => {
      this.onError(err);
    });
  }



  /**
   * This function will be called if a communication error occurs during the JSON-P request
   * @param  {Object} error  The error message received.
   */
  onError(error) {
    console.error(error);
    alert('Can\'t reach the remote server');
  }


  addLocationsToPanel(locations: HoteResultModel[]) {
    this.resultFromMap.emit(locations);
  }

  addLocationsToMap(locations) {
    const group = new H.map.Group();
    let position;
    let i;
    // Add a marker for each location found
    for (i = 0; i < locations.length; i += 1) {
      position = {
        lat: locations[i].position[0],
        lng: locations[i].position[1]
      };
      const marker = new H.map.Marker(position);
      marker.label = '<h2>' + locations[i].title + '</h2>' + locations[i].vicinity;
      group.addObject(marker);
    }
    group.addEventListener('tap', evt => {
      const evtlatLong = evt.target.getGeometry();
      this.updateMap(evtlatLong.lat, evtlatLong.lng);
      this.openBubble(
        evt.target.getGeometry(), evt.target.label);
    });
    this.map.addObject(group);
    const latLong = group.getBoundingBox().getCenter();
    this.updateMap(latLong.lat, latLong.lng);
  }

  onSuccess(result) {
    const locations = result.results.items;
    if (locations.length > 0) {
      this.addLocationsToMap(locations);
    }
    this.addLocationsToPanel(locations);
  }


}
