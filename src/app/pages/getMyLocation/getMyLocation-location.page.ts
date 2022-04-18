import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { MapsAPILoader, AgmMap } from '@agm/core';
import { NewAddressComponent } from 'src/app/shared/modals/new-address/new-address.component';
import { ModalController, AlertController, LoadingController, NavController, ToastController } from '@ionic/angular';
import { capStorageService } from 'src/app/shared/services/cap.storage';
import { autoLocationService } from './../../shared/services/autoLocation.service';
import { Router } from '@angular/router';
import { DataService } from './../../shared/services/data.service';
import { LocationService } from './../../shared/services/location.service';

declare var google;
@Component({
  selector: 'app-my-location',
  templateUrl: './getMyLocation-location.page.html',
  styleUrls: ['./getMyLocation-location.page.scss'],

})
export class GetMyLocationLocationPage implements OnInit {
  latitude: number;
  longitude: number;
  zoom: number;
  address: string;
  private geoCoder;

  watchId;

  customAddress;
  addressInfo: boolean = false;

  @ViewChild('search', { static: false })
  public searchElementRef: ElementRef;


  isCustom: boolean = false;
  constructor(
    private mapsAPILoader: MapsAPILoader,
    private cap: capStorageService,
    private nav: NavController,
    private autoLocationService: autoLocationService,
    public loadingController: LoadingController,
    private router: Router,
    public data: DataService,
    private modalCtrl: ModalController,
    public ngZone: NgZone,
    private locationService: LocationService,
    public toastController: ToastController,

  ) { }

  // options: {
  //   zoomControlOptions: {
  //     position: google.maps.ControlPosition.TOP_LEFT
  //   },
  //   mapTypeControlOptions: {
  //     style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
  //     position: google.maps.ControlPosition.BOTTOM_CENTER,
  //   }
  // }


  ngOnInit(): void {
    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder;

      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["address"]
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.getAddress(this.latitude, this.longitude);
          this.zoom = 12;
        });
      });
    });


  }


  // Get Current Location Coordinates
  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = this.autoLocationService.lat;
        this.longitude = this.autoLocationService.lng;
        this.zoom = 12;
        this.getAddress(this.latitude, this.longitude);
      });
    }
  }


  markerDragEnd($event: any) {
    this.latitude = $event.latLng.lat();
    this.longitude = $event.latLng.lng();
    this.getAddress(this.latitude, this.longitude);
  }


  getAddress(latitude, longitude) {
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 12;
          this.address = results[0].formatted_address;
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }

    });
  }


  async addressDetail() {
    const modal = await this.modalCtrl.create({
      component: NewAddressComponent,
    });
    modal.onDidDismiss()
      .then((data) => {
        const filters = data['data']; // Here's your selected user!
        if (filters.isChange == true) {
          this.customAddress = filters.info
          this.isCustom = true;
        } else {

        }

      });
    return await modal.present();
  }


  confirmAddress() {
    let data = {
      lat: this.latitude,
      long: this.longitude,
      address: this.address,
      isCustom: this.isCustom,
      customInfo: this.customAddress
    }
    let inqAddress = JSON.stringify(data);
    this.cap.setKey('serviceAddress', inqAddress).then(data => {
      this.nav.navigateForward('/services/battery-services/customer-vehicles');
    })
  }

}