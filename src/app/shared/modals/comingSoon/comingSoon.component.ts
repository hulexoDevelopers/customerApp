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
import { jobService } from './../../services/job.service';
import { inquiryService } from './../../services/inquiry,service';
import { saveLocationService } from './../../services/saveLocation.service';
@Component({
  selector: 'app-comingSoon',
  templateUrl: './comingSoon.component.html',
  styleUrls: ['./comingSoon.component.scss'],
})
export class comingSoonComponent implements OnInit {

  locations;
  constructor(
    private data: DataService,
    private modalCtrl: ModalController,
    private userService: userService,
    public toastController: ToastController,
    private inquiryService: inquiryService,
    private SocService: SocService,
    private jobService: jobService,
    private saveLocationService: saveLocationService
  ) {

  }



  ngOnInit() {
    this.getCustomerLocation();
  }




  getCustomerLocation() {
    let id = this.data.UserAuthData._id;
    this.saveLocationService.getUserLocation(id).subscribe(res => {
      this.locations = res.data.reverse();
    })
  }


  dismiss(value: boolean = false, data: any = []) {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss({
      'dismissed': true,
      'isChange': value,
      info: data
    });
  }



  saveLocation(item) {
    this.dismiss(true,item);
  }



}
