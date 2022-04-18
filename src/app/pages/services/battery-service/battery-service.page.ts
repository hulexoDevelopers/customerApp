import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { capStorageService } from './../../../shared/services/cap.storage';
import { DataService } from 'src/app/shared/services/data.service';

@Component({
  selector: 'app-battery-service',
  templateUrl: './battery-service.page.html',
  styleUrls: ['./battery-service.page.scss'],
})
export class BatteryServicePage implements OnInit {

  userAuth;

  constructor(
    private cap: capStorageService,
    private nav: NavController,
    public DataService: DataService
  ) { }

  ngOnInit() {
    this.cap.getKey('authTok').then(data => {
      this.userAuth = data;
    })
  }


  confirmChange() {
    this.cap.setName('service', 'batteryService');
    this.DataService.isService = true;
    this.DataService.Service = 'Battery Change';
    this.DataService.serviceType = 'batteryService';
    if (this.userAuth) {
      this.nav.navigateForward('/services/battery-services/customer-location');
    } else {
      this.nav.navigateForward('/login');
    }
  }



}
