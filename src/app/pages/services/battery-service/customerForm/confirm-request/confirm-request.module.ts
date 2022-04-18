import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConfirmRequestPageRoutingModule } from './confirm-request-routing.module';

import { ConfirmRequestPage } from './confirm-request.page';
import { successOrderShowComponent } from 'src/app/shared/modals/successOrder/successOrder.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConfirmRequestPageRoutingModule
  ],
  declarations: [ConfirmRequestPage,successOrderShowComponent]
})
export class ConfirmRequestPageModule {}
