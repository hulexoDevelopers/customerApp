import { Component, OnInit } from '@angular/core';

// home.page.ts
import { ViewChild, ElementRef, NgZone } from '@angular/core';
import { MapsAPILoader, AgmMap } from '@agm/core';
import { userService } from './../../../../../shared/services/user.service';
import { DataService } from './../../../../../shared/services/data.service';
import { ModalController, NavController, AlertController } from '@ionic/angular';
import { NewVehicleComponent } from 'src/app/shared/modals/new-vehicle/new-vehicle.component';
import { vehicleService } from './../../../../../shared/services/vehicle.service';
import { capStorageService } from 'src/app/shared/services/cap.storage';
import { batteryService } from './../../../../../shared/services/battery.service';
import { batteryCompanyService } from './../../../../../shared/services/batteryCompany.service';
import { inquiryModel } from './inquiry';
import { inquiryService } from './../../../../../shared/services/enquiry.service';
import { SocService } from './../../../../../shared/services/socket.service';
import { Router } from '@angular/router';
import { successOrderShowComponent } from './../../../../../shared/modals/successOrder/successOrder.component';
import { saveLocationService } from './../../../../../shared/services/saveLocation.service';



export interface User {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  state: string;
}

@Component({
  selector: 'app-confirm-request',
  templateUrl: './confirm-request.page.html',
  styleUrls: ['./confirm-request.page.scss'],
})
export class ConfirmRequestPage implements OnInit {

  serviceType;
  otherServiceData;

  inquiry = new inquiryModel();

  serviceName;
  inqAddress;
  inqVehicle;
  inqBattery;
  isInqBattery;

  inqTyre;
  isInqTyre;

  inqOil;
  isInqOil;

  isVehicleId;
  isAddress;

  vehicleData;

  btryCompanies;
  allBatteries;
  isLoad: boolean = false;

  isBatteries: boolean = false;
  user = {} as User;
  constructor(
    private userService: userService,
    private modalCtrl: ModalController,
    private vehicleService: vehicleService,
    private alertController: AlertController,
    private batteryService: batteryService,
    private batteryCompanyService: batteryCompanyService,
    private inquiryService: inquiryService,
    private cap: capStorageService,
    private saveLocationService: saveLocationService,
    private nav: NavController,
    private router: Router,
    private SocService: SocService,
    public data: DataService,
  ) {
    this.cap.getKey('service').then(data => {
      if (!data) {
        this.data.clearServiceData();
      }
    })
  }


  ionViewWillEnter() {
    this.cap.getKey('service').then(data => {
      if (!data) {
        this.data.clearServiceData();
      }
    })
  }


  ngOnInit() {
    this.cap.getKey('service').then(data => {
      if (!data) {
        this.data.clearServiceData();
      }
    })
    if (this.data.isService = false) {
      this.nav.navigateForward('/login')
    }

    this.cap.getKey('serviceName').then(data => {
      this.serviceName = data;
    })
    this.cap.getKey('serviceType').then(data => {
      this.serviceType = data;
      this.getCustomerServiceData();
      if (this.serviceType == 'otherService') {
        this.cap.getKey('otherServiceData').then(data => {
          this.otherServiceData = JSON.parse(data);
        })
      }

      if (this.serviceType == 'recoveryService' || this.serviceType == 'repairService') {
        this.cap.getKey('otherServiceData').then(data => {
          this.otherServiceData = JSON.parse(data);
        })
      }
    })


    this.getUserData(this.data.UserAuthData._id);

  }


  previousRoute() {
    if (this.serviceType == 'otherServices') {
      this.nav.navigateBack('/services/battery-services/recomended-battery');
    } else {
      this.nav.navigateBack('/services/battery-services/customer-vehicle');
    }
  }

  userData;
  getUserData(id) {
    let token = this.data.userToken;
    this.userService.getUserByid(id, token).subscribe(res => {
      if (res.success) {
        this.userData = res.data;

        this.inquiry.contactNo = res.data.contact;
        this.inquiry.customerId = res.data._id;
        this.user.firstName = res.data.firstName;
        this.user.lastName = res.data.lastName;
        this.user.email = res.data.email;
        this.user.address = res.data.address;
        this.user.state = res.data.state;
        this.isLoad = true;
      } else {
        // this.data.goBack();
      }
    })
  }


  //get custom selected location
  getCustomerServiceData() {
    this.cap.getKey('serviceAddress').then(data => {
      if (data) {
        this.inqAddress = JSON.parse(data)
        this.isAddress = true;

      } else {
        this.isAddress = false;
      }
    })
    this.cap.getKey('serviceVehicle').then(data => {

      if (data) {
        this.inqVehicle = JSON.parse(data);
        this.isVehicleId = true;
      } else {
        this.isVehicleId = false;
      }
    })

    if (this.serviceType == 'batteryService') {
      this.cap.getKey('servicebattery').then(dataId => {
        if (dataId != 'false') {
          this.cap.getKey('selectedBattery').then(data => {
            this.inqBattery = JSON.parse(data);
            this.isInqBattery = true;
            this.isLoad = true;
          })
        }
        else {
          this.isInqBattery = false;
        }
      })
    } else if (this.serviceType == 'oilService') {

      console.log('we are in our service')

      this.cap.getKey('serviceoil').then(dataId => {

        if (dataId != 'false') {
          this.cap.getKey('selectedOil').then(data => {
            this.inqOil = JSON.parse(data);
            this.isInqOil = true;
            this.isLoad = true;
          })
        }
        else {
          this.isInqOil = false;
        }
      })

    } else if (this.serviceType == 'tyreService') {

      this.cap.getKey('servicetyre').then(dataId => {
        if (dataId != 'false') {
          this.cap.getKey('selectedTyre').then(data => {

            this.inqTyre = JSON.parse(data);
            this.isInqTyre = true;
            this.isLoad = true;
          })
        }
        else {
          this.isInqTyre = false;
        }
      })

    } else if (this.serviceType == 'otherService') {

    }



  }







  isDisabled: boolean = false;
  confirmRequest() {
    this.isDisabled = true;
    this.inquiry.userId = this.data.UserAuthData._id;
    this.inquiry.inquiryFrom = 'Mobile App';
    this.inquiry.personalInfo = this.user;
    this.inquiry.serviceType = this.serviceName,
      this.inquiry.address = this.inqAddress;
    if (this.serviceType == 'batteryService') {
      let serviceDetail = {
        serviceType: this.inquiry.serviceType,
        isBattery: false,
        battery: '',
        priceQuoted: 0
      }
      if (this.isInqBattery) {
        serviceDetail.isBattery = true;
        serviceDetail.battery = this.inqBattery._id
      }
      this.inquiry.serviceDetail = serviceDetail;
    }

    if (this.serviceType == 'tyreService') {
      let serviceDetail = {
        serviceType: this.inquiry.serviceType,
        isTyre: false,
        tyre: '',
        priceQuoted: 0
      }
      if (this.isInqTyre) {
        serviceDetail.isTyre = true;
        serviceDetail.tyre = this.inqTyre._id
      }
      this.inquiry.serviceDetail = serviceDetail;
    }


    if (this.serviceType == 'oilService') {
      let serviceDetail = {
        serviceType: this.inquiry.serviceType,
        isOil: false,
        oil: '',
        priceQuoted: 0
      }
      if (this.isInqOil) {
        serviceDetail.isOil = true;
        serviceDetail.oil = this.inqOil._id
      }
      this.inquiry.serviceDetail = serviceDetail;
    }


    if (this.serviceType == 'repairService') {
      let serviceDetail = {
        serviceType: this.inquiry.serviceType,
        isDetail: false,
        appointmentDate: this.otherServiceData.appointmentDate,
        appointmentType: this.otherServiceData.appointmentType,
      }
      this.inquiry.serviceDetail = serviceDetail;
    }


    if (this.serviceType == 'recoveryService') {
      let serviceDetail = {
        serviceType: this.inquiry.serviceType,
        isDetail: false,
        appointmentDate: this.otherServiceData.appointmentDate,
        appointmentType: this.otherServiceData.appointmentType,
      }
      this.inquiry.serviceDetail = serviceDetail;
    }


    if (this.serviceType == 'otherService' && this.inquiry.serviceType == 'Car Wash') {
      let serviceDetail = {
        serviceType: this.inquiry.serviceType,
        appointmentDate: this.otherServiceData.appointmentDate,
        isPackage: true,
        appointmentType: this.otherServiceData.appointmentType,
        package: this.otherServiceData.selectedPackage
      }

      this.inquiry.serviceDetail = serviceDetail;
    }
    this.inquiry.vehicleDetail = [];
    this.inquiry.vehicleDetail.push(this.inqVehicle.vehicleId);
    this.inquiryService.addNewEnquiry(this.inquiry).subscribe(res => {
      let data = {
        inquiryType: this.inquiry.serviceType,
        by: 'Customer',
        userName: this.userData.firstName + this.userData.lastName,
        created_at: new Date()
      }
      this.SocService.emit('newInquiry', data);
      this.SocService.emit('newInquiryNotification', data);
      this.isDisabled = false;
      if (res.success) {
        this.saveNewLocation();
        this.cap.setKey('orderSuccess', true).then(data => {
          this.cap.removeName('service').then(ser => {


            // this.router.navigate(["/success"], { replaceUrl: true });
            this.successpopup();
          })

        })
      }
    })
  }


  editData(page) {
    this.cap.setKey('isEditPage', 'true').then(data => {
      this.nav.navigateBack(page);
    })
  }


  async successpopup() {
    const modal = await this.modalCtrl.create({
      component: successOrderShowComponent,
    });
    modal.onDidDismiss()
      .then((data) => {
        this.router.navigate(["/my-order"], { replaceUrl: true });

      });
    return await modal.present();
  }

  saveNewLocation() {
    this.cap.getKey('saveLocation').then(data => {
      if (data == 'false') {
        console.log('no need to save address')
        return;
      } else {
        this.addressConfirmation();
      }
    })

  }


  addressConfirmation() {
    this.alertController.create({
      header: 'Confirm Alert',
      // subHeader: 'Save A',
      message: 'Do you want to save this address for future use?',
      buttons: [
        // {
        //   text: 'Never',
        //   handler: () => {
        //     console.log('I care about humanity');
        //   }
        // },
        {
          text: 'No',
          handler: () => {
            console.log('Let me think');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            console.log('Whatever');
            this.saveAddressFor();
          }
        }
      ]
    }).then(res => {
      res.present();
    });
  }


  saveAddressFor() {
    this.alertController.create({
      header: 'Address Location',
      message: 'Please select your address label',
      buttons: [
        {
          text: 'Home',
          handler: () => {
            console.log('Let me think');
            let data = {
              userId: this.data.UserAuthData._id,
              location: this.inqAddress,
              type: 'home'
            }
            this.saveLocationService.addNewLocation(data).subscribe(res => {
              this.cap.removeName('saveLocation').then(data => {
                console.log('location remove')
              })
            })
          }
        },
        {
          text: 'Office',
          handler: () => {
            console.log('Whatever');
            let data = {
              userId: this.data.UserAuthData._id,
              location: this.inqAddress,
              type: 'office'
            }
            this.saveLocationService.addNewLocation(data).subscribe(res => {
              this.cap.removeName('saveLocation').then(data => {
                console.log('location remove')
              })
            })
          }
        }
      ]
    }).then(res => {
      res.present();
    });
  }

}
