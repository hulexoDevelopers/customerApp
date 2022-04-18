import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { companyService } from './../../../shared/services/company.service';
import { ActionSheetController, IonInfiniteScroll, LoadingController, ModalController } from '@ionic/angular';
import { IonSlides } from '@ionic/angular';
import { typeService } from './../../../shared/services/type.service';
import { providerFiltersComponent } from './../../../shared/modals/provider-filters/provider-filters.component';
import { planService } from './../../../shared/services/mealPlan.service';
import { DataService } from 'src/app/shared/services/data.service';
import { Platform } from '@ionic/angular';
import { reviewService } from './../../../shared/services/review.service';
@Component({
  selector: 'app-providertab',
  templateUrl: 'providersTab.page.html',
  styleUrls: ['providersTab.page.scss']
})
export class ProvidersTabPage implements OnInit {
  defaultImage = 'assets/img/mealcompany-placeholder.jpg';
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  allTypes;

  @ViewChild('slides', { static: true }) slides: IonSlides;
  slideOpts = {
    slidesPerView: 3.4,
    //spaceBetween: 10,
    centeredSlides: false,
    // slidesPerView: 3,
    initialSlide: 1,
    autoplay: false,
    speed: 400
  };

  allCompanies;
  dataList;
  topLimit: number = 10;

  isFilters: boolean = false;
  customeFilters;
  companyIds;
  isLoad: boolean = false;
  sortValue = ''
  constructor(
    private companyService: companyService,
    public actionSheetController: ActionSheetController,
    private typeService: typeService,
    private modalCtrl: ModalController,
    private planService: planService,
    public loadingCtrl: LoadingController,
    private reviewService: reviewService,
    public platform: Platform,
    public data: DataService

  ) {
    this.data.serverLoading();
    this.getCompanyAverageReviews() //get all review stats
    this.getAllMealTypes() //get all meal types

  }


  ngOnInit() {



    if (this.isLoad == true) {
      this.data.stopLoading();
    }



  }


  ionViewWillEnter() {
    this.data.serverLoading();
    this.getCompanyAverageReviews() //get all review stats
    this.getAllMealTypes() //get all meal types

  }

  //get all meal types
  getAllMealTypes() {
    this.typeService.getAllMealTypes().subscribe(res => {
      this.allTypes = res.data;
      this.getAllCompanies() //get all companies
    })
  }

  companiesBackup;

  //get all companies
  getAllCompanies() {
    this.companyService.getAllMealCompanies().subscribe(res => {
      this.allCompanies = res.data.filter(data => data.startingPackage.length > 0);
      this.companiesBackup = [...this.allCompanies]
      this.dataList = this.allCompanies.slice(0, this.topLimit);
      for (let i = 0; i < this.allCompanies.length; i++) {
        let rev = this.allReviewStats.find(data => data._id == this.allCompanies[i]._id);
        if (rev) {
          this.allCompanies[i].avgReview = rev.avgQuantity
        }
      }
      this.data.stopLoading();
      this.data.stopLoading();
      this.isLoad = true;

    })
  }

  loadData(event) {
    setTimeout(() => {
      this.topLimit += 10;
      this.dataList = this.allCompanies.slice(0, this.topLimit);
      event.target.complete();
      if (this.dataList.length == this.allCompanies.length) {
        event.target.disabled = true;
      }
    }, 500);
  }




  async filterModal() {
    const modal = await this.modalCtrl.create({
      component: providerFiltersComponent,
      componentProps: {
        'customFilters': this.customeFilters,
      }
    });
    modal.onDidDismiss()
      .then((data) => {
        // if(data.isFilters ==)
        // let filter = data['data'];
        // if (filter.isFilters == 'false') {

        // } else {

        // }
        const filters = data['data']; // Here's your selected user!
        if (filters.isFilters == true) {
          this.data.serverLoading();
          this.customeFilters = filters.data;
          this.getSearchMeals(this.customeFilters)
        } else {

        }

      });

    return await modal.present();
  }



  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Sort By',
      cssClass: 'sortalert',
      buttons: [{
        text: 'Price: Lowest to High',
        role: 'lth',
        // icon: 'trash',
        handler: () => {
          this.sortValue = 'Price: Lowest to High'
        }
      }, {
        text: 'Price: Highest to Low',
        // icon: 'share',
        role: 'htl',
        handler: () => {
          this.sortValue = 'Price: Highest to Low'
        }
      },
      {
        text: 'By Company Name',
        // icon: 'share',
        role: 'company',
        handler: () => {
          this.sortValue = 'By Company Name'
        }
      },
      {
        text: 'Cancel',
        // icon: 'close',
        role: 'cancel',
        handler: () => {
          this.sortValue = ''
          this.allCompanies = this.companiesBackup
        }
      }]
    });
    await actionSheet.present();

    const { role } = await actionSheet.onDidDismiss();
    this.sortCompanies(role)
  }


  //sort companies
  sortCompanies(sorting: string) {
    if (sorting) {
      if (sorting == 'lth') {
        this.allCompanies.sort((a, b) => parseFloat(a.startingPackage[0].salePrice) - parseFloat(b.startingPackage[0].salePrice));
      }

      if (sorting == 'htl') {
        this.allCompanies.sort((a, b) => parseFloat(a.startingPackage[0].salePrice) - parseFloat(b.startingPackage[0].salePrice));
        this.allCompanies.reverse();
      }

      if (sorting == 'company') {
        this.allCompanies.sort((a, b) => a.title.localeCompare(b.title));
        // this.allCompanies.sort((a,b) => (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0))
      }
    }
  }



  isPrice: boolean = false;

  typeFilter(item) {
    let data = {
      type: item.title
    }
    this.customeFilters = JSON.stringify(data);
    this.getSearchMeals(this.customeFilters)
  }


  allMeals;
  isFound = true;
  //get results 
  getSearchMeals(filterData) {
    let obj = JSON.parse(filterData)
    this.allMeals = [];
    this.allCompanies = [];
    let data = {
      location: obj.location,
      categoryId: obj.categoryId,
      type: obj.type
    }
    if (obj.price) {
      this.isPrice = true;
    }

    // this.defaultParams = data;
    this.planService.getCustomProviders(data).subscribe(res => {
      if (res.success) {
        if (res.data.length > 0) {
          this.allMeals = res.data;
          this.isFound = true;
          if (this.isPrice === true) {
            let meals = []
            for (let i = 0; i < this.allMeals.length; i++) {
              for (let j = 0; j < this.allMeals[i].packages.length; j++) {
                if (this.allMeals[i].packages[j].salePrice >= obj.price.lower && this.allMeals[i].packages[j].salePrice <= obj.price.upper) {
                  meals.push(this.allMeals[i]);

                  break;
                }
              }
            }
            this.allMeals = meals;
          }
          this.companyIds = this.allMeals.map(value => value.companyId);
          this.getCustomProvidersWithIds(this.companyIds);
          // this.isMeals = true
          this.isFound = true;
        } else {

          this.isFound = false;
          this.data.stopLoading();
          // this.isMeals = false;
          // this.ngxLoader.stop();
        }
      }

    })
  }


  //get custom providers with ids
  getCustomProvidersWithIds(data) {
    this.companyService.getCustomProvidersWithIds(data).subscribe(res => {
      this.allCompanies = res.data.filter(data => data.isPause == false);
      this.companiesBackup = [...this.allCompanies]
      for (let i = 0; i < this.allCompanies.length; i++) {
        let rev = this.allReviewStats.find(data => data._id == this.allCompanies[i]._id);
        if (rev) {
          this.allCompanies[i].avgReview = rev.avgQuantity
        }
      }
      this.data.stopLoading();
    })
  }


  doRefresh(event) {
    this.data.serverLoading();
    setTimeout(() => {
      this.getAllCompanies()
      event.target.complete();
    }, 2000);
  }

  allReviewStats;
  getCompanyAverageReviews() {
    this.reviewService.getCompanyAverage().subscribe(res => {
      this.allReviewStats = res.data;
    })
  }



  setClasses(index, review) {
    if (index <= review) {
      return 'star'
    } else {
      return 'star-outline'
    }
  }
}
