import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ForgetPageRoutingModule } from './forgetPassword-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { CoreModule } from '../../core';

import { forgetPasswordPage } from './forgetPassword.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    CoreModule,
    IonicModule,
    ForgetPageRoutingModule
  ],
  declarations: [forgetPasswordPage]
})
export class ForgetPasswordPageModule { }
