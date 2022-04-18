import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonSlides } from '@ionic/angular';
import { companyService } from './../../../shared/services/company.service';
// import { VideoPlayer, VideoOptions } from '@ionic-native/video-player/ngx';
import { DataService } from './../../../shared/services/data.service';
import { Platform } from '@ionic/angular';
import { reviewService } from './../../../shared/services/review.service';

@Component({
  selector: 'app-homeTab',
  templateUrl: 'homeTab.page.html',
  styleUrls: ['homeTab.page.scss']
})
export class HomeTabPage {
  defaultImage = 'assets/img/mealcompany-placeholder.jpg';

  showSkip = true;
  @ViewChild('slides', { static: true }) slides: IonSlides;
  slideOpts = {
    slidesPerView: 2.4,
    spaceBetween: 10,
    centeredSlides: false,
    // slidesPerView: 3,
    initialSlide: 1,
    autoplay: true,
    speed: 400
  };
  optons;
  allCompanies;
  constructor(
    public router: Router,
    private companyService: companyService,
    public data: DataService,
    public platform: Platform,
    private reviewService: reviewService,
    // private player: VideoPlayer
  ) {
    this.optons = {
      volume: 0.8
    };
  }
  ngOnInit() {
    this.getCompanyAverageReviews();
    this.getAllCompanies() //get all companies

    this.platform.backButton.subscribe(() => {

    });
  }
  // onlineVid() {
  //   this.player.play('http://static.videogular.com/assets/videos/elephants-dream.mp4').then(() => {
  //   }).catch((err) => {
  //     alert(err);
  //   });
  // }

  // close() {
  //   this.player.close();
  // }
  onSlideChangeStart(event) {
    event.target.isEnd().then(isEnd => {
      this.showSkip = !isEnd;
    });
  }


  //get all companies
  getAllCompanies() {
    this.companyService.getAllMealCompanies().subscribe(res => {
      this.allCompanies = res.data;
      for (let i = 0; i < this.allCompanies.length; i++) {
        let rev = this.allReviewStats.find(data => data._id == this.allCompanies[i]._id);
        if (rev) {
          this.allCompanies[i].avgReview = rev.avgQuantity
        }
      }
    })
  }


  ionViewWillEnter() {

  }

  ionViewDidEnter() {

  }

  ionViewWillLeave() {

  }

  ionViewDidLeave() {

  }

  ngOnDestroy() {

  }


  doRefresh(event) {
    window.location.reload();
    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }

  backButtoClick() {
    this.platform.backButton.subscribe(() => {

    });
  }


  setClasses(index, review) {
    if (index <= review) {
      return 'star'
    } else {
      return 'star-outline'
    }
  }

  counter(i) {

    if (!i || i == 0) {
      return;
    }
    i = Number(i)
    if (i > 1 && i < 2) {
      i = 2
    }
    if (i > 2 && i < 3) {
      i = 3
    }
    if (i > 3 && i < 4) {
      i = 4
    }
    if (i > 4 && i < 5) {
      i = 5
    }
    return new Array(i);
  }


  allReviewStats;
  getCompanyAverageReviews() {
    this.reviewService.getCompanyAverage().subscribe(res => {
      this.allReviewStats = res.data;
    })
  }
}
