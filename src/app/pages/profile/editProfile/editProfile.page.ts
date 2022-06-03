import { Component, OnInit } from '@angular/core';
import { jobService } from './../../../shared/services/jobs.service';
import { userService } from './../../../shared/services/user.service';
import { DataService } from './../../../shared/services/data.service';
import { inquiryService } from './../../../shared/services/inquiry,service';
import { capStorageService } from './../../../shared/services/cap.storage';
import { SocService } from './../../../shared/services/socket.service';
import { AlertController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editProfile',
  templateUrl: './editProfile.page.html',
  styleUrls: ['./editProfile.page.scss'],
})
export class editProfilePage implements OnInit {

  userData;
  isLoad: boolean = false;
  user;

  allStates;
  state = null;
  constructor(
    private jobService: jobService,
    private userService: userService,
    private router: Router,
    public data: DataService,
    private inquiryService: inquiryService,
    private cap: capStorageService,
    private SocService: SocService,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController
  ) {
    this.allStates = this.data.getAllStates();
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.getUserById();
  }

  //get user  by id 
  getUserById() {
    let id = this.data.UserAuthData._id;
    let token = this.data.userToken;
    this.userService.getUserByid(id, token).subscribe(res => {
      if (res.success) {
        this.userData = res.data;
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

        this.userService.updateUser(this.userData._id,this.user).subscribe(res => {
          loadingEl.dismiss();
          if (!res.success) {
            this.responseAlert('Error', '', res.message, false)
          } else {
            this.responseAlert('Success', '', res.message, true)
            this.router.navigateByUrl('/profile')
          }
        })
      })

    setTimeout(() => {
      this.loadingCtrl.dismiss();
    }, 5000);

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
}
