import { Component, OnInit } from '@angular/core';
import { jobService } from './../../shared/services/jobs.service';
import { userService } from './../../shared/services/user.service';
import { DataService } from './../../shared/services/data.service';
import { inquiryService } from './../../shared/services/inquiry,service';
import { capStorageService } from './../../shared/services/cap.storage';
import { SocService } from './../../shared/services/socket.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  userData;
  isLoad: boolean = false;
  constructor(
    private jobService: jobService,
    private userService: userService,
    public data: DataService,
    private inquiryService: inquiryService,
    private cap: capStorageService,
    private SocService: SocService,
  ) { }

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
        this.isLoad = true;
      } else {
        // this.data.goBack();
      }
    })
  }

}
