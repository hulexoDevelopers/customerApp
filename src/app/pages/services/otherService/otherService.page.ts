import { Component, OnInit } from '@angular/core';
import { MenuController, NavController, PopoverController, AlertController, ModalController } from '@ionic/angular';
import { capStorageService } from 'src/app/shared/services/cap.storage';
import { DataService } from 'src/app/shared/services/data.service';
import { viewPackagesComponent } from './../../../shared/modals/viewPackages/viewPackages.component';
import { packageService } from './../../../shared/services/package.service';

@Component({
  selector: 'app-ottherService',
  templateUrl: './otherService.page.html',
  styleUrls: ['./otherService.page.scss'],
})
export class OtherServicesPage implements OnInit {
  inqAddress;
  inqVehicle;

  isLoad: boolean = false;


  userAuth

  package;

  userPackage;

  appointmentDate = new Date();
  minDate

  userService;

  isSelected: boolean = false;
  appointmentType = 'call';
  constructor(
    private menu: MenuController,
    public popoverCtrl: PopoverController,
    private nav: NavController,
    private cap: capStorageService,
    private alertCtrl: AlertController,
    private packageService: packageService,
    private modalCtrl: ModalController,
    public DataService: DataService
  ) { }

  serviceName
  ionViewWillEnter() {
    this.cap.getKey('service').then(data => {
      if (!data) {
        this.DataService.clearServiceData();
      }
    })
    this.subscribedpackage('bronze')
    this.getCustomerServiceData();
    this.getWashPackagedetail();

    this.cap.getKey('serviceName').then(data => {
      this.serviceName = data;

    })
  }


  washPackage;
  packagesDetail;
  prices;
  isPrice: boolean = false;
  //get wash package detail
  getWashPackagedetail() {
    this.packageService.getAllpackages().subscribe(res => {
      this.washPackage = res[0].packages;
      this.packagesDetail = res[0].packages;
      this.packagesDetail = this.packagesDetail.filter(function (obj) {
        return obj.title !== 'price';
      });
      this.prices = res[0].packages.find(data => data.title == 'price');
      if (this.prices) {
        this.isPrice = true;
      }
    })

  }



  getCustomerServiceData() {
    this.cap.getKey('serviceAddress').then(data => {
      if (data) {
        this.inqAddress = JSON.parse(data)
      }
    })
    this.cap.getKey('serviceVehicle').then(data => {

      if (data) {
        this.inqVehicle = JSON.parse(data);

      }
    })



  }

  ngOnInit() {

    this.cap.getKey('service').then(data => {
      if (!data) {
        this.DataService.clearServiceData();
      }
    })
    let date = new Date()
    this.minDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    )

    this.cap.getKey('service').then(data => {
      this.userService = data;
    })
    this.minDate = new Date(this.minDate).toISOString();
    this.cap.getKey('authTok').then(data => {
      this.userAuth = data;
    })
  }


  selectPackage(selectedValue: any) {
    this.userPackage = selectedValue.detail.value;
  }

  subscribedpackage(pkg) {
    this.userPackage = pkg;
    this.isSelected = true;
  }

  async packageDetail() {
    const modal = await this.modalCtrl.create({
      component: viewPackagesComponent,
    });
    modal.onDidDismiss()
      .then((data) => {
        const filters = data['data']; // Here's your selected user!
        if (filters.isChange == true) {

        } else {

        }

      });
    return await modal.present();
  }


  saveServiceData() {

    if (!this.userPackage && this.serviceName == 'Car Wash') {
      this.DataService.voidPage('Error', "We did't get your package Please select package");
      return
    }


    let data = {
      isOtherPackage: true,
      appointmentDate: this.appointmentDate,
      appointmentType: this.appointmentType,
      selectedPackage: this.userPackage
    }



    if (this.userService == 'washService') {
      data.isOtherPackage = true
    } else {
      data.isOtherPackage = false;
    }
    this.cap.setKey('otherServiceData', JSON.stringify(data))

    this.DataService.isOtherPackage = true;
    this.DataService.appointmentDate = this.appointmentDate;
    this.DataService.selectedPackage = this.userPackage;

    this.cap.setKey('servicebattery', 'false').then(data => {
      this.nav.navigateForward('/services/confirm-request');
    })
    // if (this.userAuth) {
    //   this.nav.navigateForward('/services/battery-services/customer-location');
    // } else {
    //   this.nav.navigateForward('/login');
    // }
  }
}
