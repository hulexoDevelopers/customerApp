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
import { packageService } from './../../services/package.service';
@Component({
  selector: 'app-viewPackages',
  templateUrl: './viewPackages.component.html',
  styleUrls: ['./viewPackages.component.scss'],
})
export class viewPackagesComponent implements OnInit {
  @Input()
  value: any;


  packageData;
  constructor(
    private data: DataService,
    private modalCtrl: ModalController,
    private userService: userService,
    public toastController: ToastController,
    private inquiryService: inquiryService,
    private SocService: SocService,
    private jobService: jobService,
    private packageService: packageService
  ) {

  }



  ngOnInit() {
    this.getWashPackagedetail();
  }


  washPackage;
  //get wash package detail
  getWashPackagedetail() {
    this.packageService.getAllpackages().subscribe(res => {
      this.washPackage = res[0].packages;
    })

  }





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
