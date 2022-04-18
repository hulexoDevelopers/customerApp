import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { capStorageService } from 'src/app/shared/services/cap.storage';

@Component({
  selector: 'app-success',
  templateUrl: './success.page.html',
  styleUrls: ['./success.page.scss'],
})
export class SuccessPage implements OnInit {

  constructor(
    private cap: capStorageService,
    private nav: NavController,
    private router: Router,
  ) {

  }



  ionViewWillEnter() {
    this.cap.getKey('orderSuccess').then(data => {
      if (data) {

        setTimeout(() => {
          this.cap.removeName('orderSuccess')
        }, 5000);
      } else {
        this.router.navigate(["/services"], { replaceUrl: true });
      }

    })
  }

  ngOnInit() {
    this.cap.getKey('orderSuccess').then(data => {
      if (data) {

      } else {
        this.router.navigate(["/services"], { replaceUrl: true });
      }

    })


  }


  trackOrder() {

  }

}
