import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { planService } from 'src/app/shared/services/mealPlan.service';
import { companyService } from './../../../../shared/services/company.service';
import { DataService } from 'src/app/shared/services/data.service';

@Component({
  selector: 'app-provider-detail',
  templateUrl: './provider-detail.page.html',
  styleUrls: ['./provider-detail.page.scss'],
})
export class ProviderDetailPage implements OnInit {

  isLoading: boolean = false;
  companyId: string;
  company;
  companyMeals;
  allMealPlans;

  segmantValue: string = 'overview';
  segmant: string = 'overview';

  defaultImage = '../../../../assets/img/mealcompany-placeholder.jpg'
  constructor(
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private companyService: companyService,
    private planService: planService,
    public data: DataService
  ) { }

  ngOnInit() {
    this.checkParamsId(); //check if params ha id
  }

  //check params id
  checkParamsId() {
    this.route.paramMap.subscribe(paramMap => {
      this.getCompanyById(this.companyId);
      if (!paramMap.has('providerId')) {
        this.navCtrl.navigateBack('/tab/providers');
        return;
      }
      this.isLoading = true;
      this.data.serverLoading();
      this.companyId = paramMap.get('providerId');
      this.getCompanyById(this.companyId);
      this.getCompanyMeals(this.companyId)

    })

  }

  segmentChanged(ev: any) {
  }


  onFilterUpdate(ev: any) {
    this.segmantValue = ev.target.value;

  }

  //get company by id
  getCompanyById(id: string) {
    this.companyService.getCompanyById(id).subscribe(res => {
      if (!res.success) {
        this.navCtrl.navigateBack('/test/tabs/providers');
      } else {
        this.company = res.data;
        this.data.stopLoading();
      }
    })
  }


  //get company meals
  getCompanyMeals(id: string) {

    this.planService.getAllCompanyPlans(id).subscribe(res => {
      this.companyMeals = res.data;
      var result = this.companyMeals.reduce(function (r, a) {
        r[a.category] = r[a.category] || [];
        r[a.category].push(a);
        return r;
      }, Object.create(null));
      this.allMealPlans = result;
      // this.isData = true;
      this.isLoading = false;
    })
  }

}
