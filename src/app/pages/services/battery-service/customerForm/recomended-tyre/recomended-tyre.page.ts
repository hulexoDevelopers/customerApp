import { Component, OnInit } from '@angular/core';
import { userService } from './../../../../../shared/services/user.service';
import { DataService } from './../../../../../shared/services/data.service';
import { ModalController, NavController } from '@ionic/angular';
import { vehicleService } from './../../../../../shared/services/vehicle.service';
import { capStorageService } from 'src/app/shared/services/cap.storage';


@Component({
  selector: 'app-recomended-tyre',
  templateUrl: './recomended-tyre.page.html',
  styleUrls: ['./recomended-tyre.page.scss'],
})
export class RecomendedTyrePage implements OnInit {


  inqAddress;
  inqVehicle;

  vehicleData;
  recomTyres = [];
  isLoad: boolean = false;

  isTyres: boolean = false;

  inqTyre;
  constructor(
    private userService: userService,
    private modalCtrl: ModalController,
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
    this.recomTyres = [];
    this.vehicleService.getVehicleTyresById(this.inqVehicle.vehicleId).subscribe(res => {
      this.recomTyres = res.data;
      this.isTyres = true;
    })
  }


  recomSelected;
  otherSelected;
  tyreData;
  selectedTyre(tyre, i, type) {
    this.inqTyre = tyre._id;
    this.tyreData = tyre;
    if (type == 'recom') {
      this.otherSelected = null;
      this.recomSelected = i;
    } else {
      this.otherSelected = i;
      this.recomSelected = null;

    }
  }



  saveTyre(tyreValue) {

    if (tyreValue) {

      if (this.inqTyre) {
        this.cap.setKey('servicetyre', this.inqTyre).then(data => {
          this.cap.setKey('selectedTyre', JSON.stringify(this.tyreData)).then(data => {
            this.nav.navigateForward('/services/confirm-request');
          })
        })
      } else {
        this.data.voidPage('Error', "Please select tyre");
        return
      }
    } else {
      this.cap.setKey('servicetyre', 'false').then(data => {
        this.nav.navigateForward('/services/confirm-request');
      })
    }

  }


}
