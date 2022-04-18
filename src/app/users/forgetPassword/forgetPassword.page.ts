import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { registerModel } from '../models/register';
import { userService } from './../../shared/services/user.service';
import { DataService } from './../../shared/services/data.service';
import { otpService } from './../../shared/services/otp.service';
declare var $: any;
declare var jQuery: any;
@Component({
  selector: 'app-forgetPassword',
  templateUrl: './forgetPassword.page.html',
  styleUrls: ['./forgetPassword.page.scss'],
})

export class forgetPasswordPage implements OnInit {
  user = new registerModel();
  message;
  messageClass;
  userAddress;
  allStates;
  state = null;

  isLogin = false;

  confirmPassword;
  isOtp: boolean = false;
  isPassword: boolean = false;
  otp;
  otpVerified: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public data: DataService,
    private userService: userService,
    private otpService: otpService,
    // private userInfoService: UserInfoService,
    // public alert: alert
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController
  ) {
    this.allStates = this.data.getAllStates();
  }

  ngOnInit() {
    // this.sendOtp();
  }

  ngAfterViewInit() {
    // console.log('after view init call');
    // $(document).on('keydown', function (e) {
    //   if (e.keyCode == 8 && $('#Lab').is(":focus") && $('#Lab').val().length < 4) {
    //     e.preventDefault();
    //   }
    // });
  }

  isLoading: boolean = false;

  disabled: boolean = false;


  onRegister() {
    if (this.user.password != this.confirmPassword) {
      return;
    }

    this.isLoading = true;
    this.loadingCtrl
      .create({ keyboardClose: true, message: 'Please Wait...' })
      .then(loadingEl => {
        loadingEl.present();

        this.userService.registerNewUser(this.user).subscribe(res => {
          loadingEl.dismiss();
          this.isLoading = false;
          if (!res.success) {
            this.disabled = false;
            this.responseAlert('Error', '', res.message, false)
          } else {
            this.responseAlert('Success', '', res.message, true);
            this.router.navigateByUrl('/login')
          }
        })
      })

    setTimeout(() => {
      this.loadingCtrl.dismiss();
    }, 5000);

  }

  sendOtp() {
    let data = {
      // contact: '971558412742',
      contact: this.user.contact,
      email: 'abanchaudry@gmail.com'
    }
    console.log('date' + JSON.stringify(data))
    this.otpService.sendOtp(data).subscribe(res => {
      if (res.type == 'success') {
        this.responseAlert('Success', '', "An OTP has been sent to your mobile number", false);
        this.isOtp = true;
      }
    })
    // let data ={

    // }
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
            this.router.navigate(['/login'])
          }
        }
      }]
    }).then(data => {
      data.present()
    });
  }


  verifyotp() {
    let data = {
      contact: this.user.contact,
      otp: this.otp
    }
    this.otpService.verifyOtp(data).subscribe(res => {
      if (res.type == 'success') {
        this.responseAlert('Success', '', 'OTP verified successfully', false);
        this.isOtp = false;
        this.otpVerified = true;
        this.isPassword = true;
        this.user.otpVerified = true;
      } else {
        this.responseAlert('Error', '', res.message, false);
      }
    })
  }


  token;
  verifyContact() {
    let data = {
      contact: this.user.contact,
      token: this.data.getRandomNumber()
    }
    this.token = data.token;
    this.userService.updateToken(data).subscribe(res => {
      if (!res.success) {
        this.responseAlert('Error', '', res.message, false);
      } else {
        this.sendOtp()
      }
    })
  }
  resetPassword() {
    let data = {
      contact: this.user.contact,
      token: this.token,
      password: this.confirmPassword
    }
    this.userService.resetPassword(data).subscribe(res => {
      if (!res.success) {
        this.responseAlert('Error', '', res.message, false);
      } else {
        this.responseAlert('Success', '', res.message, false);
        this.router.navigate(['/login'])
      }
    })
  }
}
