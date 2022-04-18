import { Component, OnInit } from '@angular/core';
import { jobService } from './../../../shared/services/jobs.service';
import { SocService } from './../../../shared/services/socket.service';
import { userService } from './../../../shared/services/user.service';
import { DataService } from './../../../shared/services/data.service';
import { inquiryService } from './../../../shared/services/enquiry.service';
import { capStorageService } from './../../../shared/services/cap.storage';
import { Router } from '@angular/router';
import { utilityService } from './../../../shared/services/utility.service';

@Component({
  selector: 'app-my-order',
  templateUrl: './my-order.page.html',
  styleUrls: ['./my-order.page.scss'],
})
export class MyOrderPage implements OnInit {
  userData;
  isActive;
  isLoad: boolean = false;
  allJobs;

  jobs;
  constructor(
    private jobService: jobService,
    private userService: userService,
    public data: DataService,
    private inquiryService: inquiryService,
    private DataService: DataService,
    private cap: capStorageService,
    private SocService: SocService,

    private utilitService: utilityService,
    private router: Router,
  ) { }

  ngOnInit() {



  }


  getStatusClass(status) {
    status = status.toLowerCase();
    if (status == 'rejected') {
      return 'reject-status'
    } else if (status == 'pending') {
      return 'pending-status '

    } else if (status == 'assigned') {
      return 'active-status'
    }else if (status == 'completed') {
      return 'active-status'
    }
  }
  ionViewWillEnter() {

    this.getUserInquiries();
    this.SocService.on('updateActiveJobs').subscribe(data => {
      this.getUserInquiries(); //in future we replace with actual data 
    })

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


  posts$

  //get user jobs
  getUserInquiries() {

    let id = this.data.UserAuthData._id;
    this.inquiryService.getCustomerInquiriesById(id).subscribe(res => {
      if (res.data.length > 0) {
        this.allJobs = res.data;
        this.jobs = res.data;
      } else {
        this.allJobs = [];
      }
    })
  }


  filterJobs(value: string) {
    if (value == 'all') {
      this.allJobs = this.jobs;
      return;
    }
    let jobs = [...this.jobs];
    this.allJobs = jobs.filter(data => data.orderStatus == value);
  }


  logout() {
    this.cap.removeName('authTok');
    this.utilitService.logoutUser().then(data => {
      if (data) {
        this.router.navigate(['/login'], { replaceUrl: true });
      }
    })

  }


}