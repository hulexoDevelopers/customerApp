
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TrackingPageRoutingModule } from './tracking-routing.module';

import { TrackingPage } from './tracking.page';
import { AgmCoreModule } from '@agm/core';
import { AgmDirectionModule } from 'agm-direction';   // agm-direction
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AgmCoreModule.forRoot({
      // apiKey: 'AIzaSyDFhkX2pBymZ1cOIsWCPkE6F7hZ9ycF4Ds',
      apiKey: 'AIzaSyA2Xs1XgrxpKiilv6LxjOEi128JhkHB-do',
      libraries: ['places']
    }),
    AgmDirectionModule,     // agm-direction
    IonicModule,
    TrackingPageRoutingModule
  ],
  declarations: [TrackingPage]
})
export class TrackingPageModule {}
