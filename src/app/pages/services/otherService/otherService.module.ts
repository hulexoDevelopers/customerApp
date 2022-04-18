import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OtherServicesPageRoutingModule } from './otherService-routing.module';

import { OtherServicesPage } from './otherService.page';
import { viewPackagesComponent } from 'src/app/shared/modals/viewPackages/viewPackages.component';


@NgModule({
  imports: [
    CommonModule,

    FormsModule,
    IonicModule,
    OtherServicesPageRoutingModule
  ],
  declarations: [OtherServicesPage,viewPackagesComponent],
  providers: []
})
export class OtherServicesPageModule {}
