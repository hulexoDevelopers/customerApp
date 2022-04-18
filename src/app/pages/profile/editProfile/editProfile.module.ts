import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { editProfilePageRoutingModule } from './editProfile-routing.module';

import { editProfilePage } from './editProfile.page';

@NgModule({
  imports: [

  CommonModule,
    FormsModule,
    IonicModule,
    editProfilePageRoutingModule
  ],
  declarations: [editProfilePage]
})
export class editProfilePageModule {}
