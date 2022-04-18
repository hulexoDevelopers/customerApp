import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecomendedBatteryPageRoutingModule } from './recomended-battery-routing.module';

import { RecomendedBatteryPage } from './recomended-battery.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecomendedBatteryPageRoutingModule
  ],
  declarations: [RecomendedBatteryPage]
})
export class RecomendedBatteryPageModule {}
