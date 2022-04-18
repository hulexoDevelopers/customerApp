import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CoreModule } from './../../core/core.module';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from './../../shared/shared.module';
import { DashboardPageRoutingModule } from './dashboard-routing.module';

import { DashboardPage } from './dashboard.page';

@NgModule({
  imports: [


    CommonModule,
    FormsModule,
    CoreModule,
    SharedModule,
    IonicModule,
    DashboardPageRoutingModule
  ],
  declarations: [DashboardPage]
})
export class DashboardPageModule { }
