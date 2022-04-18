import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecomendedOilPageRoutingModule } from './recomended-oil-routing.module';

import { RecomendedOilPage } from './recomended-oil.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecomendedOilPageRoutingModule
  ],
  declarations: [RecomendedOilPage]
})
export class RecomendedOilPageModule { }
