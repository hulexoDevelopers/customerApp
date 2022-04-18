import { Component, OnInit } from '@angular/core';

// home.page.ts
import { ViewChild, ElementRef, NgZone } from '@angular/core';
import { MapsAPILoader, AgmMap } from '@agm/core';
import { userService } from './../../../../../shared/services/user.service';
import { DataService } from './../../../../../shared/services/data.service';
import { ModalController, NavController } from '@ionic/angular';
import { NewVehicleComponent } from 'src/app/shared/modals/new-vehicle/new-vehicle.component';
import { vehicleService } from './../../../../../shared/services/vehicle.service';
import { capStorageService } from 'src/app/shared/services/cap.storage';
import { batteryService } from './../../../../../shared/services/battery.service';
import { batteryCompanyService } from './../../../../../shared/services/batteryCompany.service';

@Component({
  selector: 'app-recomended-battery',
  templateUrl: './recomended-battery.page.html',
  styleUrls: ['./recomended-battery.page.scss'],
})
export class RecomendedBatteryPage implements OnInit {


  inqAddress;
  inqVehicle;

  vehicleData;

  btryCompanies;
  allBatteries;
  recomBatteries = [];
  isLoad: boolean = false;

  isBatteries: boolean = false;
  dataLoad: boolean = false;
  inqBattery;
  constructor(
    private userService: userService,
    private modalCtrl: ModalController,
    private vehicleService: vehicleService,
    private batteryService: batteryService,
    private batteryCompanyService: batteryCompanyService,
    private cap: capStorageService,
    private nav: NavController,
    public data: DataService,
  ) { }

  ngOnInit() {

    this.cap.getKey('service').then(data => {
      if (!data) {
        this.data.clearServiceData();
      }
    })
    this.getCustomerServiceData();
  }


  ionViewWillEnter() {
    this.cap.getKey('service').then(data => {
      if (!data) {
        this.data.clearServiceData();
      }
    })
    this.getCustomerServiceData();
  }

  //get all battery companies
  getAllBatteryCompanies() {
    this.batteryCompanyService.getAllBatteryCompanysList().subscribe(res => {
      this.btryCompanies = res.data;
    })
  }

  //get custom selected location
  getCustomerServiceData() {
    this.cap.getKey('serviceAddress').then(data => {
      if (data) {
        this.inqAddress = JSON.parse(data)
      } else {
        this.data.goBack();
      }
    })
    this.cap.getKey('serviceVehicle').then(data => {
      if (data) {
        this.inqVehicle = JSON.parse(data);
        this.getVehicleData();
        this.isLoad = true;
      } else {
        this.data.goBack();
      }
    })
  }




  getVehicleData() {
    this.recomBatteries = [];
    this.vehicleService.getVehicleBatteriesById(this.inqVehicle.vehicleId).subscribe(res => {
      this.recomBatteries = res.data;
      this.isBatteries = true;
    })
  }


  recomSelected;
  otherSelected;

  batteryData;
  selectedBattery(btry, i, type) {
    this.batteryData = btry;
    this.inqBattery = btry._id
    if (type == 'recom') {
      this.otherSelected = null;
      this.recomSelected = i;
    } else {
      this.otherSelected = i;
      this.recomSelected = null;

    }
  }



  saveBattery(btryValue) {

    if (btryValue) {

      if (this.inqBattery) {
        this.cap.setKey('servicebattery', this.inqBattery).then(data => {
          this.cap.setKey('selectedBattery', JSON.stringify(this.batteryData)).then(data => {
            this.nav.navigateForward('/services/confirm-request');
          })

        })
      } else {
        this.data.voidPage('Error', "Please select battery");
        return
      }
    } else {
      this.cap.setKey('servicebattery', 'false').then(data => {
        this.nav.navigateForward('/services/confirm-request');
      })
    }

  }


}
