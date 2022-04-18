import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BatteryServicePageRoutingModule } from './battery-service-routing.module';

import { BatteryServicePage } from './battery-service.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BatteryServicePageRoutingModule
  ],
  declarations: [BatteryServicePage]
})
export class BatteryServicePageModule {}
