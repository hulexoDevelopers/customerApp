import { Component, OnInit } from '@angular/core';
import { jobService } from './../../shared/services/jobs.service';
import { userService } from './../../shared/services/user.service';
import { DataService } from './../../shared/services/data.service';
import { inquiryService } from './../../shared/services/inquiry,service';
import { capStorageService } from './../../shared/services/cap.storage';
import { SocService } from './../../shared/services/socket.service';
import { AlertController, LoadingController } from '@ionic/angular';
import { vehicleService } from './../../shared/services/vehicle.service';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.page.html',
  styleUrls: ['./vehicles.page.scss'],
})
export class VehiclesPage implements OnInit {

  userData;
  isLoad: boolean = false;
  user;

  allStates;
  state = null;

  vehicles = [];
  allVehicles;
  constructor(
    private jobService: jobService,
    private userService: userService,
    public data: DataService,
    private inquiryService: inquiryService,
    private cap: capStorageService,
    private SocService: SocService,
    private vehicleService: vehicleService,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController
  ) {
    this.allStates = this.data.getAllStates();
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.getAllVehiclesList();

  }


  //get all vehicles list
  getAllVehiclesList() {
    this.vehicleService.getAllVehicleList().subscribe(res => {
      this.allVehicles = res.data;
      this.getUserById();
    })
  }


  //get user vehicle
  getUserVehicle(id: string) {
    let vehicle = this.allVehicles.find(data => data._id == id);
    return vehicle;
  }

  //get user  by id 
  getUserById() {
    let id = this.data.UserAuthData._id;
    let token = this.data.userToken;
    this.userService.getUserByid(id, token).subscribe(res => {
      if (res.success) {
        this.userData = res.data;
        this.vehicles = res.data.vehicles;
        this.user = res.data;
        this.state = res.data.state;
        this.isLoad = true;
      } else {
        // this.data.goBack();
      }
    })
  }


  updateProfile() {
    this.loadingCtrl
      .create({ keyboardClose: true, message: 'Please Wait...' })
      .then(loadingEl => {
        loadingEl.present();

        this.userService.updateUser(this.userData._id, this.user).subscribe(res => {
          loadingEl.dismiss();
          if (!res.success) {
            this.responseAlert('Error', '', res.message, false)
          } else {
            this.responseAlert('Success', '', res.message, true)
            // this.router.navigateByUrl('/login')
          }
        })
      })

    setTimeout(() => {
      this.loadingCtrl.dismiss();
    }, 5000);

  }


  removeVehicle(item) {
    console.log('item' + JSON.stringify(item));
    var index = this.userData.vehicles.indexOf(item);
    if (index > -1) {
      this.userData.vehicles.splice(index, 1);
      this.updateProfile();
    }
  }

  responseAlert(header: string, subHeader: string, message: string, success: boolean) {
    this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: header,
      subHeader: subHeader,
      message: message,
      buttons: [{
        text: 'OK',
        handler: () => {
          if (success == true) {
            // this.router.navigate(['/login'])
          }
        }
      }]
    }).then(data => {
      data.present()
    });
  }


  deleteConfirmation(item) {
    this.alertCtrl.create({
      header: 'Confirm Alert',
      // subHeader: 'Save A',
      message: 'Do you want to delete this vehicle?',
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
          text: 'Yes Delete',
          handler: () => {
            console.log('Whatever');
            this.removeVehicle(item);
          }
        }
      ]
    }).then(res => {
      res.present();
    });
  }

}
