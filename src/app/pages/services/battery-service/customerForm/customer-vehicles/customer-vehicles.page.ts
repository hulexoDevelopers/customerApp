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
@Component({
  selector: 'app-customer-vehicles',
  templateUrl: './customer-vehicles.page.html',
  styleUrls: ['./customer-vehicles.page.scss'],
})
export class CustomerVehiclesPage implements OnInit {
  userData;
  userVehicles: any;
  vehicles = [];
  allVehicles;
  inqAddress;

  inqVehicle;
  isCustomVehicle: boolean = false;
  constructor(
    private userService: userService,
    private modalCtrl: ModalController,
    private vehicleService: vehicleService,
    private cap: capStorageService,
    private nav: NavController,
    public data: DataService,
  ) {

    this.getAllUserVehicles();
  }

  ionViewWillEnter() {
    this.cap.getKey('service').then(data => {
      if (!data) {
        this.data.clearServiceData();
      }
    })

    this.getAllUserVehicles();

  }


  ngOnInit() {


    this.cap.getKey('service').then(data => {
      if (!data) {
        this.data.clearServiceData();
      }
    })
    this.getUserData(this.data.UserAuthData._id);
  }


  //get user vehicles list
  getAllUserVehicles() {
    this.userService.getUserVehicles(this.data.UserAuthData._id, this.data.userToken).subscribe(res => {
      this.userVehicles = res.data;
      this.getCustomSelectedLocation();
    })
  }


  //get user vehicle
  getUserVehicle(id: string) {
    let vehicle = this.userVehicles.find(data => data._id == id);
    if (vehicle) {
      return vehicle;
    } else {
      let data = {
        imageUrl: 'assets/img/carbrand-alt.png'
      }
      return data
    }

  }

  //get custom selected location
  getCustomSelectedLocation() {
    this.cap.getKey('serviceAddress').then(data => {
      if (data) {
        this.inqAddress = JSON.parse(data)
      } else {
        this.data.goBack();
      }
    })
  }

  isLoad: boolean = false;
  //get user data
  getUserData(id) {
    let token = this.data.userToken;
    this.userService.getUserByid(id, token).subscribe(res => {
      if (res.success) {
        this.userData = res.data;
        if (this.userData.vehicles.length > 0) {
          this.vehicles = this.userData.vehicles.reverse();
          if (this.isCustomVehicle) {
            this.inqVehicle = this.vehicles[0];
            this.selectedIndex = 0;
          }
        }
        this.isLoad = true;
      } else {
        // this.data.goBack();
      }
    })
  }


  selectedVehicle(item) {
    this.inqVehicle = item;
  }

  saveInqVehicle() {
    if (this.inqVehicle) {
      let inqVehicle = JSON.stringify(this.inqVehicle);
      this.cap.setKey('serviceVehicle', inqVehicle).then(data => {
        this.cap.getKey('service').then(data => {
          if (data == 'batteryService') {
            this.nav.navigateForward('/services/recomended-battery');
          } else if (data == 'tyreService') {
            this.nav.navigateForward('/services/recomended-tyre');
          } else if (data == 'oilService') {
            this.nav.navigateForward('/services/recomended-oil');
          }
          else if (data == 'repairService') {
            this.nav.navigateForward('/services/other-services');
          } else {
            this.nav.navigateForward('/services/other-services');
          }
        })
        // }
      })
    } else {
      this.data.voidPage('Error', "Please select your vehicle");
      return

    }

  }



  async addNewVehicle() {
    const modal = await this.modalCtrl.create({
      component: NewVehicleComponent,
    });
    modal.onDidDismiss()
      .then((data) => {
        const filters = data['data']; // Here's your selected user!
        if (filters.isChange == true) {
          this.getAllUserVehicles();
          this.getUserData(this.data.UserAuthData._id);
          this.inqVehicle = filters.info;
          this.isCustomVehicle = true;
        } else {

        }

      });
    return await modal.present();
  }


  selectedIndex: number = null;

  setIndex(index: number) {
    this.selectedIndex = index;
  }
}