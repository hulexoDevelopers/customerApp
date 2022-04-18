import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProviderDetailPageRoutingModule } from './provider-detail-routing.module';

import { ProviderDetailPage } from './provider-detail.page';
import { SharedModule } from '../../../../shared/shared.module'
import { ProviderMealsComponent } from 'src/app/shared/components/provider-meals/provider-meals.component';
import { ProviderGalleryComponent } from 'src/app/shared/components/provider-gallery/provider-gallery.component';
import { ProviderReviewsComponent } from 'src/app/shared/components/provider-reviews/provider-reviews.component';
import { AddReviewComponent } from 'src/app/shared/modals/add-Review/AddReview.component';
import { LazyLoadImageModule } from 'ng-lazyload-image';
@NgModule({
  imports: [
    LazyLoadImageModule,
    CommonModule,
    FormsModule,
    SharedModule,
    IonicModule,
    ProviderDetailPageRoutingModule
  ],
  declarations: [ProviderDetailPage,ProviderMealsComponent,ProviderGalleryComponent,ProviderReviewsComponent,AddReviewComponent]
})
export class ProviderDetailPageModule {}
