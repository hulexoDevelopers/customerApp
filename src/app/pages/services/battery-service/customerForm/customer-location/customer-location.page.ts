import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { MapsAPILoader, AgmMap } from '@agm/core';
import { NewAddressComponent } from 'src/app/shared/modals/new-address/new-address.component';
import { ModalController, AlertController, LoadingController, NavController, ToastController } from '@ionic/angular';
import { capStorageService } from 'src/app/shared/services/cap.storage';
import { autoLocationService } from './../../../../../shared/services/autoLocation.service';
import { Router } from '@angular/router';
import { DataService } from './../../../../../shared/services/data.service';
import { LocationService } from './../../../../../shared/services/location.service';
import { comingSoonComponent } from './../../../../../shared/modals/comingSoon/comingSoon.component';

declare var google;
@Component({
  selector: 'app-customer-location',
  templateUrl: './customer-location.page.html',
  styleUrls: ['./customer-location.page.scss'],
})
export class CustomerLocationPage implements OnInit {
  // @ViewChild('keywords-input') keywordsInput;
  latitude: number;
  longitude: number;

  lastLat: number;
  lastLong: number;
  zoom: number;
  address: string;
  private geoCoder;

  watchId;

  customAddress;
  addressInfo: boolean = false;
  newAddress: boolean = true;

  @ViewChild('search', { static: false })
  public searchElementRef: ElementRef;


  isCustom: boolean = false;

  isEditPage: boolean = false;

  options: {
    zoomControlOptions: {
      position: google.maps.ControlPosition.BOTTOM_LEFT,
      style: google.maps.ZoomControlStyle.SMALL
    },
    mapTypeControlOptions: {
      style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
      position: google.maps.ControlPosition.BOTTOM_CENTER
    },
    options: { mapTypeId: google.maps.MapTypeId.SATELLITE }
  }


  marker = 'assets/img/map-pin.png'
  icon = {
    url: 'assets/img/map-pin.png',
    scaledSize: {
      width: '10',
      height: '10'
    }
  }
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
    private alertCtrl: AlertController,
    public toastController: ToastController,

  ) { }
  SMALL = "SMALL"

  ionViewWillEnter() {
    if (!this.latitude) {
      this.presentLoading();
    }

    this.cap.getKey('service').then(data => {
      if (!data) {
        this.data.clearServiceData();
      }
    })

  }


  ngAfterViewInit() {

  }


  ionViewWillLeave() {
    this.closeLoader();
    this.isCustom = false;
  }


  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      duration: 10000
    });
    await loading.present();
    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }


  async closeLoader() {
    // Instead of directly closing the loader like below line
    // return await this.loadingController.dismiss();

    this.checkAndCloseLoader();

    // sometimes there's delay in finding the loader. so check if the loader is closed after one second. if not closed proceed to close again
    setTimeout(() => this.checkAndCloseLoader(), 1000);

  }

  async checkAndCloseLoader() {
    // Use getTop function to find the loader and dismiss only if loader is present.
    const loader = await this.loadingController.getTop();
    // if loader present then dismiss
    if (loader !== undefined) {
      await this.loadingController.dismiss();
    }
  }


  ngOnInit() {
    this.cap.getKey('service').then(data => {
      if (!data) {
        this.data.clearServiceData();
      }
    })



    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder;

      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        componentRestrictions: { country: "AE" },
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();



          autocomplete.setComponentRestrictions({
            country: ["AE"],
          });
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
  public setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = this.autoLocationService.lat;
        this.longitude = this.autoLocationService.lng;
        this.lastLat = this.autoLocationService.lat;
        this.lastLong = this.autoLocationService.lng;
        this.zoom = 12;
        this.getAddress(this.latitude, this.longitude);
        this.checkAndCloseLoader();
      });
    }
  }


  markerDragEnd($event: any) {
    this.latitude = $event.coords.lat;
    this.longitude = $event.coords.lng;
    this.getAddress(this.latitude, this.longitude);
  }


  getAddress(latitude, longitude) {
    this.newAddress = true
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 12;
          this.address = results[0].formatted_address;
          this.closeLoader();
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
          this.customAddress = filters.info;
          this.isCustom = true;

        } else {
          this.isCustom = false;
        }

      });
    return await modal.present();
  }


  async saveAddress() {
    const modal = await this.modalCtrl.create({
      component: comingSoonComponent,
    });
    modal.onDidDismiss()
      .then((data) => {
        const filters = data['data']; // Here's your selected user!
        if (filters.isChange == true) {
          this.newAddress = false;
          this.latitude = filters.info.location[0].lat;
          this.longitude = filters.info.location[0].long;
          this.address = filters.info.location[0].address;
          if (filters.info.location[0].isCustom == true) {
            this.customAddress = filters.info.location[0].customInfo;
            this.isCustom = true;
          } else {
            this.isCustom = false;
          }
        } else {

        }

      });
    return await modal.present();
  }



  confirmAddress() {
    if (!this.latitude) {
      this.data.voidPage('Error', "We did't get your location Please select your location");
      return
    }
    let data = {
      lat: this.latitude,
      long: this.longitude,
      address: this.address,
      isCustom: this.isCustom,
      customInfo: this.customAddress
    }
    let inqAddress = JSON.stringify(data);
    this.cap.setKey('serviceAddress', inqAddress).then(data => {
      this.nav.navigateForward('/services/customer-vehicles');
 
        this.cap.setKey('saveLocation', this.newAddress).then(data => {
          console.log('save new location');
        })
      
    })
  }


  defaultLocation() {
    this.latitude = this.lastLat;
    this.longitude = this.lastLong;

    this.zoom = 12;
    this.getAddress(this.latitude, this.longitude);
    return;
    this.presentLoading();
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = this.autoLocationService.lat;
        this.longitude = this.autoLocationService.lng;

        this.zoom = 12;
        this.getAddress(this.latitude, this.longitude);
      });
    }


  }
}