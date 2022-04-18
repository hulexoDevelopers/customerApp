import { Component, OnInit } from '@angular/core';
import { userService } from './../../../../../shared/services/user.service';
import { DataService } from './../../../../../shared/services/data.service';
import { ModalController, NavController } from '@ionic/angular';
import { vehicleService } from './../../../../../shared/services/vehicle.service';
import { capStorageService } from 'src/app/shared/services/cap.storage';


@Component({
  selector: 'app-recomended-oil',
  templateUrl: './recomended-oil.page.html',
  styleUrls: ['./recomended-oil.page.scss'],
})
export class RecomendedOilPage implements OnInit {


  inqAddress;
  inqVehicle;

  vehicleData;
  recomOils = [];
  isLoad: boolean = false;

  isOils: boolean = false;

  inqOil;
  constructor(
    private vehicleService: vehicleService,
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
    this.recomOils = [];
    this.vehicleService.getVehicleOilsById(this.inqVehicle.vehicleId).subscribe(res => {
      this.recomOils = res.data;
      this.isOils = true;
    })
  }


  recomSelected;
  otherSelected;

  oilData;
  selectedOil(oil, i, type) {
    this.oilData = oil;
    this.inqOil = oil._id
    if (type == 'recom') {
      this.otherSelected = null;
      this.recomSelected = i;
    } else {
      this.otherSelected = i;
      this.recomSelected = null;

    }
  }



  saveOil(oilValue) {

    if (oilValue) {

      if (this.inqOil) {
        this.cap.setKey('serviceoil', this.inqOil).then(data => {
          this.cap.setKey('selectedOil', JSON.stringify(this.oilData)).then(data => {
            this.nav.navigateForward('/services/confirm-request');
          })
   
        })
      } else {
        this.data.voidPage('Error', "Please select oil");
        return
      }
    } else {
      this.cap.setKey('serviceoil', 'false').then(data => {
        this.nav.navigateForward('/services/confirm-request');
      })
    }

  }


}
