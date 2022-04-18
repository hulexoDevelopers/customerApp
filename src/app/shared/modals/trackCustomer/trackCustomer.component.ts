import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DataService } from '../../services/data.service';
// import { DataService } from './../../services/data.service';
import { userService } from './../../services/user.service';
import { MapsAPILoader, AgmMap } from '@agm/core';
import { NgZone } from '@angular/core';
import { Capacitor } from "@capacitor/core";
import { LocationService } from '../../services/location.service';
// const { Geolocation, Toast } = Plugins;
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@awesome-cordova-plugins/native-geocoder/ngx';
import { ToastController } from '@ionic/angular';
import { SocService } from './../../services/socket.service';
import { autoLocationService } from './../../services/autoLocation.service';
import { Subject } from 'rxjs';
import { ILatLng } from '../../directives/location.directive';
@Component({
  selector: 'app-trackCustomer',
  templateUrl: './trackCustomer.component.html',
  styleUrls: ['./trackCustomer.component.scss'],
})
export class trackCustomerComponent implements OnInit {
  @Input()
  value: any;

  userData;
  customerData;
  isUser: boolean = false;
  isActive: boolean = true;
  isLoad: boolean = false;

  customerLat;
  customerLong;



  lat;
  lng;
  watchId;



  latitude: number;
  longitude: number;
  zoom: number;
  address: string;
  private geoCoder;

  // // Washington, DC, USA
  // origin: ILatLng = {
  //   latitude: 38.889931,
  //   longitude: -77.009003
  // };
  // // New York City, NY, USA
  // destination: ILatLng = {
  //   latitude: 40.730610,
  //   longitude: -73.935242
  // };
  // displayDirections = true;


  public lat1;
  public lng1;

  public origin1: any;
  public destination1: any;

  showMap: boolean = false;
  // zoom = 14;
  constructor(
    private data: DataService,
    private modalCtrl: ModalController,
    private userService: userService,
    public ngZone: NgZone, private locationService: LocationService,
    private geolocation: Geolocation,
    private nativeGeocoder: NativeGeocoder,
    public toastController: ToastController,
    private SocService: SocService,
    private mapsAPILoader: MapsAPILoader,
    private autoLocationService: autoLocationService,
  ) {

    this.getDirection();
  }


  getDirection() {
    //technician locations
    // this.origin1 = { lat: this.lat1, lng: this.lng1 };

    //customer locations
    // this.destination1 = { lat: 24.799524, lng: 120.975017 };

    // Location within a string
    // this.origin = 'Taipei Main Station';
    // this.destination = 'Taiwan Presidential Office';
  }
  ;


  public renderOptions = {
    suppressMarkers: true,
  }

  public markerOptions = {
    origin: {
      icon: 'assets/img/direction-car.png',
      // draggable: false,
    },
    destination: {
      icon: 'assets/img/direction-car.png',
      // label: 'MARKER LABEL',
      opacity: 1,
    },
  }
  // markerOptions = {
  //   origin: {
  //     icon: 'assets/img/car.jpg',
  //     scale: 10
  //   },
  //   destination: {
  //     icon: 'assets/img/direction-car.png',
  //     scale: 10
  //   },

  // }



  ngOnInit() {
    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder;
    });


    this.autoLocationService.userLocationDetailsObs.subscribe((userDetails) => {
      this.lat1 = Number(userDetails.lat);
      this.lng1 = Number(userDetails.long);
      let customerValue = JSON.parse(this.value);

      if (userDetails) {

        this.origin1 = { lat: Number(userDetails.lat), lng: Number(userDetails.long) };
        this.destination1 = { lat: Number(customerValue[0].lat), lng: Number(customerValue[0].long) }

        this.showMap = true;


      }

    })
  }



  // Get Current Location Coordinates
  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = this.autoLocationService.lat
        this.longitude = this.autoLocationService.lng;
        this.zoom = 12;
        this.lat1 = Number(this.latitude);
        this.lng1 = Number(this.longitude);
        let customerValue = JSON.parse(this.value);

        this.origin1 = { lat: Number(this.lat1), lng: Number(this.lng1) };
        this.destination1 = { lat: Number(customerValue[0].lat), lng: Number(customerValue[0].long) }

        this.showMap = true;
        // this.getAddress(this.latitude, this.longitude);
      });
    }
  }


  // markerDragEnd($event: any) {
  //   this.latitude = $event.latLng.lat();
  //   this.longitude = $event.latLng.lng();
  //   this.getAddress(this.latitude, this.longitude);
  // }


  




  dismiss(value: boolean = false, data: any = {}) {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss({
      'dismissed': true,
      'isChange': value,
      info: data
    });
  }







}
