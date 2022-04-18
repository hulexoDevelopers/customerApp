import { Component, OnInit } from '@angular/core';
import { userService } from './../../shared/services/user.service';
import { DataService } from 'src/app/shared/services/data.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

// import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';

// import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  latitude: any = 0; //latitude
  longitude: any = 0; //longitude


  wlatitude: any = 0; //latitude
  wlongitude: any = 0; //longitude

  userData;
  userAuth;
  isLoad: boolean = false;
  address: string;
  isActive: boolean;
  constructor(
    private userService: userService,
    public data: DataService,
    private alertCtrl: AlertController,
    private geolocation: Geolocation,
    private nativeGeocoder: NativeGeocoder,
    private router: Router,
  ) {
    this.userAuth = this.data.UserAuthData;
  }

  options = {
    timeout: 10000,
    enableHighAccuracy: true,
    maximumAge: 3600
  };




  ngOnInit() {

  }


  async ionViewWillEnter() {
    this.getUserById(this.data.UserAuthData._id);

  }


  //get user  by id 
  getUserById(id) {
    let token = this.data.userToken;
    this.userService.getUserByid(id, token).subscribe(res => {
      if (res.success) {
        this.userData = res.data;
        if (this.userData.activeStatus == true) {
          this.isActive = true;
        } else {
          this.isActive = false;
        }
        this.isLoad = true;
      } else {
        // this.data.goBack();
      }
    })
  }

  //update user active status
  updateUserActiveStatus(status) {
    let data = {
      status: status
    }
    this.userService.updateActiveStatus(this.userData._id, data).subscribe(res => {
      if (res.success) {
        this.isActive = status
        this.getCurrentCoordinates();
      }
    })
  }


  //my distance = 0.33539887019732967
  //subhan distance = 0.4211953038283229

  getDistance() {
    let lat1 = '31.714245671967138';
    let lon1 = '72.98962056751141';
    let lat2 = '31.7150671';
    let lon2 = '72.9862088';

    let distance = this.getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2);


  }


  // use geolocation to get user's device coordinates
  getCurrentCoordinates() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;
      this.getAddress(this.latitude, this.longitude);
    
    // });
  }).catch((error) => {

  });
  }
// geocoder options
nativeGeocoderOptions: NativeGeocoderOptions = {
  useLocale: true,
  maxResults: 5
};
// get address using coordinates
getAddress(lat, long) {
  this.nativeGeocoder.reverseGeocode(lat, long, this.nativeGeocoderOptions)
    .then((res: NativeGeocoderResult[]) => {
      this.address = this.pretifyAddress(res[0]);
    })
    .catch((error: any) => {
      alert('Error getting location' + JSON.stringify(error));
    });
}

// address
pretifyAddress(address) {
  let obj = [];
  let data = "";
  for (let key in address) {
    obj.push(address[key]);
  }
  obj.reverse();
  for (let val in obj) {
    if (obj[val].length)
      data += obj[val] + ', ';
  }
  return address.slice(0, -2);
}


getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = this.deg2rad(lat2 - lat1);  // deg2rad below
  var dLon = this.deg2rad(lon2 - lon1);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2)
    ;
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c; // Distance in km
  return d;
}

deg2rad(deg) {
  return deg * (Math.PI / 180)
}

  // responseAlert(header: string, subHeader: string, message: string, success: boolean) {
  //   this.alertCtrl.create({
  //     cssClass: 'my-custom-class',
  //     header: header,
  //     subHeader: subHeader,
  //     message: message,
  //     buttons: [{
  //       text: 'OK',
  //       handler: () => {
  //         if (success == true) {
  //           this.router.navigate(['/login'])
  //         }
  //       }
  //     }]
  //   }).then(data => {
  //     data.present()
  //   });
  // }


}
