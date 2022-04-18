import { Component } from '@angular/core';
import { StorageService } from './shared/services/storage.servicet';
import { dataStorageService } from './shared/services/data.storage';
import { DataService } from './shared/services/data.service';
import { Storage } from '@ionic/storage-angular';
import jwt_decode from 'jwt-decode';
import { ViewChildren, QueryList } from '@angular/core';

import { Platform, IonRouterOutlet, ToastController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
// import { Platform } from 'ionic-angular';
// import { Platform } from '@ionic/angular';
import { capStorageService } from './shared/services/cap.storage';
import { AutoLogoutService } from './shared/services/autoLogout.service';
import { SocService } from './shared/services/socket.service';
import { updateLocationService } from './shared/services/trackLocation.service';
import { autoLocationService } from './shared/services/autoLocation.service';
import { userService } from './shared/services/user.service';
import { utilityService } from './shared/services/utility.service';
import { ELocalNotificationTriggerUnit, LocalNotifications } from '@awesome-cordova-plugins/local-notifications/ngx';
import { vehicleService } from './shared/services/vehicle.service';
import { ScreenOrientation } from '@awesome-cordova-plugins/screen-orientation/ngx';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  likes: any = 10;
  isLoggedin: boolean = false;
  user;
  allNotif = []
  appPages = [
    {
      title: 'Schedule',
      url: '/app/tabs/schedule',
      icon: 'calendar'
    },
    {
      title: 'Speakers',
      url: '/app/tabs/speakers',
      icon: 'people'
    },
    {
      title: 'Map',
      url: '/app/tabs/map',
      icon: 'map'
    },
    {
      title: 'About',
      url: '/app/tabs/about',
      icon: 'information-circle'
    }
  ];
  loggedIn = false;
  dark = false;

  //code for exit app
  // set up hardware back button event.
  lastTimeBackPress = 0;
  timePeriodToExit = 2000;
  //code for exit app
  @ViewChildren(IonRouterOutlet) routerOutlets: QueryList<IonRouterOutlet>;

  private _storage: Storage | null = null;
  constructor(
    private storageService: StorageService,
    private dataStorageService: dataStorageService,
    public DataService: DataService,
    private cap: capStorageService,
    private autoLogout: AutoLogoutService,
    private userService: userService,
    private SocService: SocService,
    private vehicleService: vehicleService,
    // public plt: Platform,
    public platform: Platform,
    private storage: Storage,
    private toastController: ToastController,
    private updateLocationService: updateLocationService,
    private autoLocationService: autoLocationService,
    private utilitService: utilityService,
    private router: Router,
    private LocalNotifications: LocalNotifications,
    private alertCtrl: AlertController,
    private screenOrientation: ScreenOrientation
  ) {

    this.initializeApp();
    // Initialize BackButton Eevent.
    this.backButtonEvent();
    this.saveSharedDataFromStorage()
  }

  isLogged: boolean = false;
  isLoad: boolean = false;
  ngAfterViewInit() {
    this.autoLocationService.getMyLocation();
  }

  ionViewWillEnter() {
    this.autoLocationService.getMyLocation();
    this.saveSharedDataFromStorage()
  }



  initializeApp() {
    this.platform.ready().then(() => {
      this.LocalNotifications.on('click').subscribe(res => {
        let msg = res.data ? res.data.myData : '';
        this.showAlert(res.title, res.text, msg)
      });

      this.LocalNotifications.on('trigger').subscribe(res => {
        let msg = res.data ? res.data.myData : '';
        this.showAlert(res.title, res.text, msg)
      })
      // this.statusBar.styleLightContent();
      // this.splash.hide()
    });
  }


  private showAlert(header, subheader, message: string) {
    this.alertCtrl
      .create({
        header: header,
        subHeader: subheader,
        message: message,
        buttons: ['Ok']
      })
      .then(alertEl => alertEl.present());
  }
  scheduleNotfications(title: string, text: string, orderId: string) {
    this.LocalNotifications.schedule({
      id: this.DataService.getRandomNumber(),
      title: title,
      text: text,
      data: { mydata: orderId },
      trigger: { in: 5, unit: ELocalNotificationTriggerUnit.SECOND },
      foreground: true
    })
  }


  getAllNotif() {
    this.LocalNotifications.getAll().then(res => {
      this.allNotif = res;
    })
  }



  updateJobData;
  async ngOnInit() {
    // set to landscape
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
    this.DataService._userLogged.subscribe(data => {
      this.isLogged = data;
    })
    // this.tutingTest()
    this.saveSharedDataFromStorage()
    this.SocService.on('updateActiveJobs').subscribe(data => {
      this.updateJobData = data;
      this.cap.getKey('authTok').then(data => {
        if (data) {
          this.DataService.userToken = data;
          this.DataService.UserAuthData = this.getDecodedAccessToken(data);
          this.DataService._userLogged.next(true);
          this.isLogged = true
          if (this.DataService.UserAuthData._id == this.updateJobData.customerId) {
            this.scheduleNotfications('Job Assigned', `Your job  ${this.updateJobData.inquiryId} has been assigned to ${this.updateJobData.technicianName}`, this.updateJobData.inquiryId)
          }

        } else {
          this.DataService._userLogged.next(false);
          this.isLogged = false;
        }
      })



    })

  }

  // active hardware back button
  backButtonEvent() {
    this.platform.backButton.subscribe(async () => {

      this.routerOutlets.forEach(async (outlet: IonRouterOutlet) => {
        if (outlet && outlet.canGoBack()) {
          outlet.pop();

        }

        if (this.router.url != '/services') {
          this.DataService.goBack();
        }

        if (this.router.url === '/services') {
          if (new Date().getTime() - this.lastTimeBackPress < this.timePeriodToExit) {
            // this.platform.exitApp(); // Exit from app
            navigator['app'].exitApp(); // work in ionic 4
          } else {
            const toast = await this.toastController.create({
              message: 'Press back again to exit App.',
              duration: 2000,
              position: 'middle'
            });
            toast.present();
            this.lastTimeBackPress = new Date().getTime();
          }
        }
      });
    });
  }



  saveSharedDataFromStorage() {
    this.getAllVehiclesList();
    this.cap.getKey('authTok').then(data => {
      console.log('date' + data)
      if (data) {

        this.DataService.userToken = data;
        this.DataService.UserAuthData = this.getDecodedAccessToken(data);
        this.DataService.isAuthenticated = true;
        this.getUserById()
        this.utilitService.getUserById().then(data => [

        ])
        let userData = {
          userId: this.DataService.UserAuthData._id,
          role: this.DataService.UserAuthData.role
        }
        this.SocService.emit('addUser', userData);
        this.autoLocationService.getUserByIdAndUpdateLocation(this.DataService.UserAuthData._id)
      }

    })
  }


  //get all vehicles list
  getAllVehiclesList() {
    this.vehicleService.getAllVehicleList().subscribe(res => {
      this.DataService.AllVehicles = res.data;
    })
  }


  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    }
    catch (Error) {
      return null;
    }
  }


  logout() {
    this.cap.removeName('authTok');

    this.router.navigate(['/login'], { replaceUrl: true });
  }


  async showNotification(data) {
    const toast = await this.toastController.create({
      header: 'Order Assigned',
      message: `Your order no ${data.inquiryId} is assigned to ${data.technicianName}`,
      position: 'top',
      buttons: [
        {
          side: 'end',
          text: 'Track',
          handler: () => {

          }
        }, {
          side: 'start',
          text: 'OK',
          role: 'cancel',
          handler: () => {

          }
        }
      ]
    });
    await toast.present();

    const { role } = await toast.onDidDismiss();


  }


  //get user  by id 
  getUserById() {
    let id = this.DataService.UserAuthData._id;
    let token = this.DataService.userToken;
    this.userService.getUserByid(id, token).subscribe(res => {
      if (res.success) {
        this.user = res.data;
        this.isLoggedin = true;
        this.isLogged = true;
      } else {
        this.user = ''
        this.isLoggedin = false;
        this.isLogged = false;
        // this.data.goBack();
      }
    })
  }

}