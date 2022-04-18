import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CustomerVehiclesPageRoutingModule } from './customer-vehicles-routing.module';

import { CustomerVehiclesPage } from './customer-vehicles.page';
import { AgmCoreModule } from '@agm/core';
import { NewVehicleComponent } from '../../../../../shared/modals/new-vehicle/new-vehicle.component';
import { SelectDropDownModule } from 'ngx-select-dropdown';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelectDropDownModule,
    // AgmCoreModule.forRoot({
    //   apiKey: 'AIzaSyA2Xs1XgrxpKiilv6LxjOEi128JhkHB-do'
    // }),
    CustomerVehiclesPageRoutingModule
  ],
  declarations: [CustomerVehiclesPage,NewVehicleComponent]
})
export class CustomerVehiclesPageModule {}
