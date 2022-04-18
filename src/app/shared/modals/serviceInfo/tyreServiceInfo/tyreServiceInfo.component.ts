import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DataService } from '../../../services/data.service';
import { userService } from './../../../services/user.service';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@awesome-cordova-plugins/native-geocoder/ngx';
import { ToastController } from '@ionic/angular';
import { SocService } from './../../../services/socket.service';

@Component({
  selector: 'app-tyreServiceInfo',
  templateUrl: './tyreServiceInfo.component.html',
  styleUrls: ['./tyreServiceInfo.component.scss'],
})
export class tyreServiceInfoComponent implements OnInit {

  constructor(
    private data: DataService,
    private modalCtrl: ModalController,
    public toastController: ToastController,
    private SocService: SocService,

  ) {

  }



  ngOnInit() {

  }





  confirm() {
    this.dismiss(true);
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
