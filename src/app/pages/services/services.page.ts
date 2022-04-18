import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { MenuController, NavController, PopoverController } from '@ionic/angular';
import { capStorageService } from 'src/app/shared/services/cap.storage';
import { DataService } from 'src/app/shared/services/data.service';
import { MapsAPILoader, AgmMap } from '@agm/core';
import { NewAddressComponent } from 'src/app/shared/modals/new-address/new-address.component';
import { ModalController, AlertController, LoadingController, ToastController } from '@ionic/angular';
import { autoLocationService } from './../../shared/services/autoLocation.service';
import { Router } from '@angular/router';
import { LocationService } from './../../shared/services/location.service';
import { callContactComponent } from 'src/app/shared/modals/contact/contact.component';
import { batteryServiceInfoComponent } from './../../shared/modals/serviceInfo/bateryServiceInfo/batteryServiceInfo.component';
import { oilServiceInfoComponent } from './../../shared/modals/serviceInfo/oilServiceInfo/oilServiceInfo.component';
import { tyreServiceInfoComponent } from './../../shared/modals/serviceInfo/tyreServiceInfo/tyreServiceInfo.component';
import { washServiceInfoComponent } from './../../shared/modals/serviceInfo/washServiceInfo/washServiceInfo.component';

declare var google;
@Component({
  selector: 'app-services',
  templateUrl: './services.page.html',
  styleUrls: ['./services.page.scss'],
})
export class ServicesPage implements OnInit {

  userAuth;
  // @ViewChild('keywords-input') keywordsInput;
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

  isEditPage: boolean = false;

  options: {
    zoomControlOptions: {
      position: google.maps.ControlPosition.TOP_LEFT
    }
    // options: { mapTypeId: google.maps.MapTypeId.SATELLITE }
  }

  hybridOption: { mapTypeId: google.maps.MapTypeId.SATELLITE }
  mapType = 'satellite';
  mapLoad: boolean = false;
  constructor(
    private menu: MenuController,
    public popoverCtrl: PopoverController,
    private nav: NavController,
    private cap: capStorageService,
    public DataService: DataService,
    private mapsAPILoader: MapsAPILoader,
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


  ngOnInit() {
    this.cap.getKey('authTok').then(data => {
      this.userAuth = data;
    });

    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder;

      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["address"],
        componentRestrictions: { country: "AE" },
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();



          autocomplete.setComponentRestrictions({
            country: ["AE", 'pk'],
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

        this.latitude = 25.197371727135508;
        this.longitude = 55.274408584004775;
        this.zoom = 12;
        this.mapLoad = true;
        this.getAddress(this.latitude, this.longitude);
        this.checkAndCloseLoader();
      });
    }
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
  };


  async checkAndCloseLoader() {
    // Use getTop function to find the loader and dismiss only if loader is present.
    const loader = await this.loadingController.getTop();
    // if loader present then dismiss
    if (loader !== undefined) {
      await this.loadingController.dismiss();
    }
  }

  ionViewWillEnter() {
    this.cap.getKey('authTok').then(data => {
      this.userAuth = data;
    })

    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
     
    });
  }


  isPageLoad: boolean = false;
  ionViewDidLoad() {
    // this.isPageLoad = true;
  }


  async batteryService() {
    const modal = await this.modalCtrl.create({
      component: batteryServiceInfoComponent,
    });
    modal.onDidDismiss()
      .then((data) => {
        const filters = data['data']; // Here's your selected user!
        if (filters.isChange == true) {
          this.cap.setName('serviceType', 'batteryService');
          this.cap.setName('serviceName', 'Battery Change');
          this.cap.setName('service', 'batteryService');
          this.DataService.isService = true;
          this.DataService.Service = 'Battery Change';
          this.DataService.serviceType = 'batteryService';
          if (this.userAuth) {
            this.nav.navigateForward('/services/customer-location');
          } else {
            this.nav.navigateForward('/login');
          }
        }

      });
    return await modal.present();

  }



  async oilService() {
    const modal = await this.modalCtrl.create({
      component: oilServiceInfoComponent,
    });
    modal.onDidDismiss()
      .then((data) => {
        const filters = data['data']; // Here's your selected user!
        if (filters.isChange == true) {
          this.cap.setName('serviceType', 'oilService');
          this.cap.setName('service', 'oilService');
          this.cap.setName('serviceName', 'Oil Change');
          this.DataService.isService = true;
          this.DataService.Service = 'Oil Change';
          this.DataService.serviceType = 'oilService';
          if (this.userAuth) {
            this.nav.navigateForward('/services/customer-location');
          } else {
            this.nav.navigateForward('/login');
          }
        }

      });
    return await modal.present();

  }


  async tyreService() {
    const modal = await this.modalCtrl.create({
      component: tyreServiceInfoComponent,
    });
    modal.onDidDismiss()
      .then((data) => {
        const filters = data['data']; // Here's your selected user!
        if (filters.isChange == true) {
          this.cap.setName('serviceType', 'tyreService');
          this.cap.setName('service', 'tyreService');
          this.cap.setName('serviceName', 'Tyre Change');
          this.DataService.isService = true;
          this.DataService.Service = 'Tyre Change';
          this.DataService.serviceType = 'tyreService';
          if (this.userAuth) {
            this.nav.navigateForward('/services/customer-location');
          } else {
            this.nav.navigateForward('/login');
          }
        }
      })
    return await modal.present();
  }



  async washService() {
    const modal = await this.modalCtrl.create({
      component: washServiceInfoComponent,
    });
    modal.onDidDismiss()
      .then((data) => {
        const filters = data['data']; // Here's your selected user!
        if (filters.isChange == true) {
          this.cap.setName('serviceType', 'otherService');
          this.cap.setName('service', 'washService');
          this.cap.setName('serviceName', 'Car Wash');
          this.DataService.isService = true;
          this.DataService.Service = 'Car Wash';
          this.DataService.serviceType = 'oilService';
          if (this.userAuth) {
            this.nav.navigateForward('/services/customer-location');
          } else {
            this.nav.navigateForward('/login');
          }
        }

      })
    return await modal.present();
  }



  async contactService() {
    const modal = await this.modalCtrl.create({
      component: callContactComponent,
    });
    modal.onDidDismiss()
      .then((data) => {
        // const filters = data['data']; // Here's your selected user!
        // if (filters.isChange == true) {
        //   this.cap.setName('serviceType', 'otherService');
        //   this.cap.setName('service', 'washService');
        //   this.cap.setName('serviceName', 'Car Wash');
        //   this.DataService.isService = true;
        //   this.DataService.Service = 'Car Wash';
        //   this.DataService.serviceType = 'oilService';
        //   if (this.userAuth) {
        //     this.nav.navigateForward('/services/customer-location');
        //   } else {
        //     this.nav.navigateForward('/login');
        //   }
        // }

      })
    return await modal.present();
  }


  async serviceCall() {

  }


  async batteryServiceInfo() {
    const modal = await this.modalCtrl.create({
      component: batteryServiceInfoComponent,
      // componentProps: {
      //   'service': data
      // }
    });
    modal.onDidDismiss()
      .then((data) => {
        // const filters = data['data']; // Here's your selected user!
        // if (filters.isChange == true) {
        //   this.customAddress = filters.info
        //   this.isCustom = true;
        // } else {

        // }

      });
    return await modal.present();
  }

}
