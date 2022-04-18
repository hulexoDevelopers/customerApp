import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecomendedTyrePageRoutingModule } from './recomended-tyre-routing.module';

import { RecomendedTyrePage } from './recomended-tyre.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecomendedTyrePageRoutingModule
  ],
  declarations: [RecomendedTyrePage]
})
export class RecomendedTyrePageModule { }
