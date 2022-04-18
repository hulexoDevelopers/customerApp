import { Component, OnInit } from '@angular/core';
import { jobService } from './../../../shared/services/jobs.service';
import { SocService } from './../../../shared/services/socket.service';
import { userService } from './../../../shared/services/user.service';
import { DataService } from './../../../shared/services/data.service';
import { inquiryService } from './../../../shared/services/enquiry.service';
import { capStorageService } from './../../../shared/services/cap.storage';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { utilityService } from './../../../shared/services/utility.service';
import { vehicleService } from './../../../shared/services/vehicle.service';
import { batteryService } from './../../../shared/services/battery.service';
import { tyreService } from './../../../shared/services/tyre.service';
import { oilService } from './../../../shared/services/oil.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.page.html',
  styleUrls: ['./order-detail.page.scss'],
})
export class OrderDetailPage implements OnInit {
  orderId;
  orderData;
  isActive;
  isLoad: boolean = false;

  isVehicle: boolean = false;
  vehicle;

  isBattery: boolean = false;
  batteryData;

  isTyre: boolean = false;
  tyreData;

  isOil: boolean = false;
  oilData;

  isWash: boolean = false;
  washPackage;
  constructor(
    private jobService: jobService,
    private userService: userService,
    public data: DataService,
    private inquiryService: inquiryService,
    private vehicleService: vehicleService,
    private DataService: DataService,
    private route: ActivatedRoute,
    private cap: capStorageService,
    private SocService: SocService,
    private batteryService: batteryService,
    private tyreService: tyreService,
    private oilService: oilService,


    private utilitService: utilityService,
    private router: Router,
  ) { }

  ngOnInit() { }


  //get params id
  getParamsId() {
    this.route.params.subscribe((params: Params) => {
      if (params) {
        this.orderId = params.id;
        if (!this.orderId) {
          this.data.goBack();
          return;
        } else {
          this.getOrderDetail(this.orderId);
        }
      }
    });
  }

  ionViewWillEnter() {
    this.isBattery = false;
    this.isOil = false;
    this.isTyre = false;
    this.getParamsId();


  }

  getOrderDetail(orderId) {
    this.inquiryService.getEnquiryById(orderId).subscribe(res => {
      this.orderData = res.data;
      this.getVehicleDetail(this.orderData.vehicleDetail[0])
      if (this.orderData.serviceType == 'Battery Change' && this.orderData.serviceDetail[0].isBattery) {
        this.getBatteryDetail(this.orderData.serviceDetail[0].battery)
      } else if (this.orderData.serviceType == 'Oil Change' && this.orderData.serviceDetail[0].isOil) {
        this.getOilDetail(this.orderData.serviceDetail[0].oil)
      } else if (this.orderData.serviceType == 'Tyre Change' && this.orderData.serviceDetail[0].isTyre) {
        this.getTyreDetail(this.orderData.serviceDetail[0].tyre)
      } else {

      }
    })
  }


  //get vehicle detail
  getVehicleDetail(id: string) {
    this.vehicleService.getVehicleDetail(id).subscribe(res => {
      if (res.data.length > 0) {
        this.isVehicle = true;
        this.vehicle = res.data[0];
      }
    })
  }

  //get battery detail
  getBatteryDetail(id: string) {
    this.batteryService.getBatteryDetailById(id).subscribe(res => {
      this.batteryData = res.data[0];
      this.isBattery = true
    })
  }

  //get tyre detail
  getTyreDetail(id: string) {
    this.tyreService.getTyreDetailById(id).subscribe(res => {
      this.tyreData = res.data[0];
      this.isTyre = true
    })
  }

  //get oil detail
  getOilDetail(id: string) {
    this.oilService.getOilDetailById(id).subscribe(res => {
      this.oilData = res.data[0];
      this.isOil = true
    })
  }

}