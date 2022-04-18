import { Component, OnInit } from '@angular/core';
import { jobService } from './../../shared/services/jobs.service';
import { userService } from './../../shared/services/user.service';
import { DataService } from './../../shared/services/data.service';
import { inquiryService } from './../../shared/services/inquiry,service';
import { capStorageService } from './../../shared/services/cap.storage';
import { SocService } from './../../shared/services/socket.service';
import { AlertController, LoadingController } from '@ionic/angular';
import { vehicleService } from './../../shared/services/vehicle.service';
import { LocationService } from './../../shared/services/location.service';
import { saveLocationService } from './../../shared/services/saveLocation.service';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.page.html',
  styleUrls: ['./locations.page.scss'],
})
export class locationsPage implements OnInit {


  locations;
  locationFor
  constructor(
    private jobService: jobService,
    private userService: userService,
    public data: DataService,
    private inquiryService: inquiryService,
    private cap: capStorageService,
    private SocService: SocService,
    private vehicleService: vehicleService,
    private loadingCtrl: LoadingController,
    private saveLocationService: saveLocationService,
    private alertCtrl: AlertController
  ) {

  }


  ngOnInit() {
    this.getCustomerLocation();
  }



  isLoad: boolean = false;
  getCustomerLocation() {
    let id = this.data.UserAuthData._id;
    this.saveLocationService.getUserLocation(id).subscribe(res => {
      this.locations = res.data.reverse();
      this.isLoad = true;
    })
  }

  updateLocation(item) {
    this.saveLocationService.updateLocation(item._id, item).subscribe(res => {
      console.log('res' + JSON.stringify(res))
    })
    console.log('update location')
  }
}
