import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DataService } from './../../services/data.service';
import { userService } from './../../services/user.service';
import { StorageService } from './../../services/storage.servicet';


import { IonicSelectableComponent } from 'ionic-selectable';
import { searchConfigService } from './../../services/search.config';
import { brandService } from './../../services/brand.service';
import { vehicleService } from './../../services/vehicle.service';

class Port {
  public id: number;
  public name: string;
}

export interface vehicle {
  brand: string;
  vehicleId: string;
  modelTitle: string;
  modelYear: string;
  plate: string;
  color: string;
}

@Component({
  selector: 'app-new-vehicle',
  templateUrl: './new-vehicle.component.html',
  styleUrls: ['./new-vehicle.component.scss'],
})
export class NewVehicleComponent implements OnInit {

  year;

  ports: Port[];
  port: Port;

  @Input() userId: string;
  customerData;

  allBrands;
  allVehicles;
  brandVehicles;


  selectedBrand;
  brand;

  vehicle;
  selectedVehicle;
  plate;

  customerVehicle: vehicle[] = [];
  vehicles = []
  brandConfig;
  modalConfig;
  vehicleYear: string = null;
  allYears;

  brandModal
  constructor(
    public data: DataService,
    private userService: userService,
    private modalCtrl: ModalController,
    private StorageService: StorageService,
    private searchConfigService: searchConfigService,
    private brandService: brandService,
    private vehicleService: vehicleService
  ) {

    this.brandConfig = this.searchConfigService.brandConfig;
    this.modalConfig = this.searchConfigService.modelConfig;
    this.allYears = this.data.vehicleYears;
    this.getAllVehiclesBrands();
    this.getAllVehicles();
    this.getUserData();
  }


  //get all vehicle brands
  getAllVehiclesBrands() {
    this.brandService.getAllBrandsList().subscribe(res => {
      this.allBrands = res.data;
    })
  }

  //get all vehicles
  getAllVehicles() {
    this.vehicleService.getAllVehicleList().subscribe(res => {
      this.allVehicles = res.data;
    })
  }


  ngOnInit() {

  }


  changeBrand(ev) {
    console.log('ev' + JSON.stringify(ev))
    let id = ev.target.value;
    // this.selectedBrand = ev.value;
    this.brandVehicles = this.allVehicles.filter(data => data.brandId == id);
    this.brand = this.allBrands.find(data => data._id == id)
  }

  // brandChange(id: string) {

  // }

  sVehicle
  changeVehicle(ev) {
    this.selectedVehicle = ev.target.value;
    this.sVehicle = this.allVehicles.find(data => data._id == this.selectedVehicle);
  }

  //get user data
  getUserData() {
    let token = this.data.userToken;
    let userId = this.data.UserAuthData._id;
    this.userService.getUserByid(userId, token).subscribe(res => {
      if (res.success) {
        this.customerData = res.data;
      } else {
        this.data.goBack();
      }
    })
  }


  isDisabled: boolean = false;
  saveNewVehicle() {
    let data = {
      brand: this.brand.title,
      vehicleId: this.selectedVehicle,
      modelTitle: this.sVehicle.title,
      modelYear: this.vehicleYear,
      plate: this.plate,
      color: ''
    }
    this.isDisabled = true;
    this.customerData.vehicles.push(data);
    let token = this.data.userToken;
    let userId = this.data.UserAuthData._id;
    this.userService.updateUser(userId, this.customerData).subscribe(res => {
      if (!res.success) {
        this.dismiss(false)
      } else {
        this.dismiss(true)
      }
      // this.data.onRefresh();
    })

    // let data = {
    //   address: this.address,
    //   state: this.state,
    //   contact: this.customerData.contact
    // }
    // this.customerData.address.push(data)
    // this.userService.updateUser(this.userId, this.customerData).subscribe(res => {
    //   if (!res.success) {
    //     this.dismiss(false)
    //   } else {
    //     this.dismiss(true)
    //   }
    //   // this.data.onRefresh();
    // })
  }



  dismiss(value: boolean = false) {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss({
      'dismissed': true,
      'isChange': value
    });
  }
  pattern = '[A-Za-z0-9]{0,5}]'
  inputCheck() {

  }


  public onKeyUp(event: any) {

    let newValue = event.target.value;

    let regExp = new RegExp('^[A-Za-z0-9? ]+$');

    if (!regExp.test(newValue)) {
      event.target.value = newValue.slice(0, -1);
    }
  }

  keyPressAlphanumeric(event) {


    let newValue = event.target.value;
    let regExp = new RegExp('^[A-Za-z0-9? ]+$');
    if (!regExp.test(newValue)) {

      // let value = newValue.slice(0, -1);
      event.target.value = newValue.slice(0, -1);
      this.plate = ''
      this.plate = event.target.value;

    }
    // event.preventDefault();
    // var inp = String.fromCharCode(event.keyCode);
    // console.log('inp' + inp)
    // if (/[a-zA-Z0-9]/.test(inp)) {
    //   return true;
    // } else {
    //   event.preventDefault();
    //   return false;
    // }
  }
  unamePattern = "[a-zA-Z0-9 ]+";
  replaceFun() {
    const value = this.plate.replace(/[^a-zA-Z0-9]/g, '');
    this.plate = value;

  }
}
