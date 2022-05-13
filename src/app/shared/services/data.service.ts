import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { Router, RoutesRecognized } from '@angular/router';
import { filter, pairwise } from 'rxjs/operators';
import jwt_decode from 'jwt-decode';
import { capStorageService } from './cap.storage';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public isOtherPackage: boolean = false;
  public appointmentDate;
  public selectedPackage;
  public UserAuthData: any;
  public userLogData: any;
  public isAuthenticated: boolean = false;
  public userToken: string;
  public planId: string;
  public Service: string;
  public isService: boolean = false;
  public serviceType;
  public isAddress: boolean = false;
  public customerAddress;
  selectedTab = '';
  currentUrl;
  previousUrl;
  public loginUser: any;
  public AllVehicles = [];

  servicesInfo = [{
    id: 'battery',
    title: 'Battery Service',
    detail: 'Is your car not starting or is the engine making cranky sounds? It’s either a faulty battery that needs replacement or your vehicle’s starter has come undone. Call 800 78278 now. We provide 24/7 jump start and car battery replacement services across the UAE.',
    list: ['Onsite battery installation', '30-45 minutes turnaround time', 'Real time order tracking', '100% genuine batteries', 'Up to 18 months warranty', 'Competitive yet pocket friendly prices', 'Onsite warranty claims', 'Disposal of old battery responsibly']
  },
  {
    id: 'oil',
    title: 'Oil Change',
    detail: 'Regular oil change and checkup ensures that your car remains fully-lubricated and functional. We offer minor and major car service packages for all brands and models. We use only top grades lubricants, genuine filters, along with comprehensive car health checks.',
    list: ['•	Onsite oil change', '•	Competitive yet pocket friendly prices', '•	3 minutes enquiry response time', '•	30-45 minutes service time', '•	Minor services: oil change, oil filter replacement, air filter cleaning, battery and tyre check', '•	Major services: minor service plus spark plug replacement, brake pads replacement, mechanical and electrical inspection, wheel balancing and tyre rotation']
  },
  {
    id: 'tyre',
    title: 'Tyres',
    detail: 'Tires are the legs of a vehicle. You shouldn’t delay tire repair and replacement. We keep a fresh stock of car tyres from reputed manufacturers and provide onsite replacement services to give you a hassle-free tyre change experience.',
    list: ['•	Onsite tyre replacement', '•	All-inclusive prices (product, delivery and installation)', '•	All tyres brands available for major car brands and models', '•	100 percent original tyres with warranty', '•	Skilled tyre replacement staff', '•	Excellent after-service support', '•	Customized vehicle equipped with high tech machinery']
  },
  {
    id: 'repair',
    title: 'Car Repair',
    detail: 'Timely car care and repair is the make-or-break for any vehicle. In our 10-year track record, we have mastered the art of mechanical, electrical, and other preventive maintenance for your car. Bring your car to us for a free comprehensive inspection.',
    list: ['•	We have a full- equipped service centre in Al Quoz, Dubai',
      '•	State-of-art OBD and machinery', '•	Every vehicle gets assigned a service advisor',
      '•	100% genuine spare parts from reputed suppliers', '•	Seasoned mechanics and technicians', '•	Post-service follow-up and assistance', '•	Hassle-Free car repair experience']
  },
  {
    id: 'wash',
    title: 'Car Wash',
    detail: 'If you are looking out for car wash services, and cannot visit a workshop because of time constraints, we can help you. We provide onsite car wash services that are accomplished using environment-friendly car wash solutions along with top-quality fiber towels that give your car the long-lasting shine that your car deserves.',
    list: ['•	Onsite car wash services', '•	Thorough car cleaning and sterilization',
      '•	High quality wax and fiber towels', '•	Skilled car wash professionals ', '•	Skilled car wash professionals '
    ]
  },
  {
    id: 'recovery',
    title: 'Car Recovery',
    detail: 'We ensure that motorists never feel stuck on stranded on the road. So long as you are in the UAE, we can send immediate assistance and bail you out of a roadside emergency.  Our car recovery team will reach you in 30 minutes and do the needful in a hassle-free manner. ',
    list: ['•	40+ mobile recovery specialists at your service', '•	24/7 car towing facility',
      '•	Bilingual and skilled crew', '•	GPS-tracking system used', '•	Safe and secure recovery experience',
      '•	Emergency fuel, flat tyre help, dead battery assistance, jump start and other mechanical and electrical repairs onsite']
  }
  ]


  vehicleYears = ['2022', '2021', '2020', '2019', '2018', '2017', '2016', '2015', '2014', '2013', '2012', '2011', '2010', '2009',
    '2008', '2007', '2006', '2005', '2004', '2003', '2002', '2001'];
  public months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
  public expYears = ['21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40']
  constructor(
    private location: Location,
    public loadingController: LoadingController,
    private alertCtrl: AlertController,
    private cap: capStorageService,
    private nav: NavController,
    private router: Router
  ) {
    this.currentUrl = this.router.url;
    this.previousUrl = null;

    this.router.events
      .pipe(filter((event: any) => event instanceof RoutesRecognized), pairwise())
      .subscribe((events: RoutesRecognized[]) => {
        if (events[0].urlAfterRedirects) {
          this.previousUrl = events[0].urlAfterRedirects;
        }
        if (events[1].urlAfterRedirects) {
          this.currentUrl = events[1].urlAfterRedirects;

        }


      });
  }


  public getPreviousUrl() {
    if (this.previousUrl == null) {
      this.router.navigateByUrl('/login')
    } else {
      this.router.navigateByUrl(this.previousUrl)
    }
    // return this.previousUrl;
  }


  getAllStates() {
    let states = ['Abu Dhabi', 'Ajman', 'Dubai', 'Ras Al Khaimah', 'Sharjah', 'Umm Al Quwain'];
    return states;
  }


  //get random number for bill
  getRandomNumber() {
    let billNo = 0;
    let num = Math.floor(Math.random() * (999999 - 100000)) + 100000;
    return num

  }


  goBack() {
    this.location.back();
  }



  async serverLoading() {

    const loading = await this.loadingController.create({
      // spinner: ,
      // duration: 5000,
      message: 'Please wait...',
      translucent: true,
      cssClass: 'custom-class custom-loading'
    });
    setTimeout(() => {
      // this.loadingController.dismiss();
      this.loadingController.getTop().then(v => v ? this.loadingController.dismiss() : null);
    }, 10000);
    return await loading.present();

  }

  async stopLoading() {
    // this.loadingController.dismiss();
    this.checkAndCloseLoader();

    // sometimes there's delay in finding the loader. so check if the loader is closed after one second. if not closed proceed to close again
    setTimeout(() => this.checkAndCloseLoader(), 1000);
  }


  async checkAndCloseLoader() {
    // Use getTop function to find the loader and dismiss only if loader is present.
    const loader = await this.loadingController.getTop();
    // if loader present then dismiss
    if (loader !== undefined) {
      await this.loadingController.dismiss();
    }
  }




  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    }
    catch (Error) {
      return null;
    }
  }


  getPlanDays(days, startDate) {
    const schedule = []
    let uID = this.generateRandomString(6);
    for (let i = 0; i < Number(days); i++) {
      let d = new Date(startDate);
      d.setDate(d.getDate() + i);
      d.setHours(0, 0, 0, 0);
      var end = new Date(d)
      end.setHours(23, 59, 59);
      let sDate = this.withoutTime(new Date(d)) //cinvert dates
      let data = {
        id: uID,
        title: '',
        start: new Date(sDate),
        end: new Date(end),
        status: 'active'
      }
      schedule.push(data)
    }

    return schedule;
    // this.Globals.mealSchedule = this.mealPlan
  }


  generateRandomString(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  year;
  month;
  date;
  withoutTime(eventDate) {
    let date = new Date(eventDate);
    this.year = date.getFullYear();
    this.month = date.getMonth() + 1;
    this.date = date.getDate();
    if (this.date < 10) {
      this.date = '0' + this.date;
    }
    if (this.month < 10) {
      this.month = '0' + this.month;
    }
    let datee = this.year + '-' + this.month + '-' + this.date
    return datee
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


  voidPage(header = 'Error', message) {
    this.alertCtrl
      .create({
        header: header,
        subHeader: '',
        message: message,
        buttons: ['OK']
      })
      .then(alertEl => alertEl.present());
  }



  removeServiceData() {
    this.cap.removeName('serviceAddress');
    this.cap.removeName('serviceVehicle');
    this.cap.removeName('serviceType');
    this.cap.removeName('serviceName');
    this.cap.removeName('service');
    this.isService = false;
    this.Service = '';
    this.serviceType = '';
  }



  clearServiceData() {
    this.cap.removeName('service').then(data => {
      // this.nav.navigateForward('/services');
      this.router.navigate(["/services"], { replaceUrl: true });
    });
  }



  public _userLogged: Subject<any> = new Subject<any>();    // consider putting the actual type of the data you will receive
  public userLoggedObs = this._userLogged.asObservable();
  logoutUser() {
    this._userLogged.next(false);
    this.cap.removeName('authTok');
    this.isOtherPackage = false;
    this.appointmentDate = null;
    this.selectedPackage = '';
    this.UserAuthData = null;
    this.isAuthenticated = false;
    this.userToken = null;
    this.Service = null;
    this.isService = false;
    this.serviceType = null;
    this.loginUser = null;
    this.router.navigate(['/login'], { replaceUrl: true });
  }



  keyPressAlphanumeric(event) {

    var inp = String.fromCharCode(event.keyCode);
    console.log('inp' + inp)
    if (/[a-zA-Z0-9]/.test(inp)) {
      return true;
    } else {
      event.preventDefault();
      event.srcEvent.stopPropagation();
      return false;
    }
  }


  public onKeyUp(event: any) {

    let newValue = event.target.value;
    console.log('val' + newValue)
    let regExp = new RegExp('^[A-Za-z0-9? ]+$');

    if (!regExp.test(newValue)) {
      event.target.value = newValue.slice(0, -1);
    }
  }
}