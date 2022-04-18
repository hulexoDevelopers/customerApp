import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CustomerLocationPageRoutingModule } from './customer-location-routing.module';

import { CustomerLocationPage } from './customer-location.page';
import { NewAddressComponent } from './../../../../../shared/modals/new-address/new-address.component';
import { AgmCoreModule } from '@agm/core';
import { autoLocationService } from 'src/app/shared/services/autoLocation.service';
import { LocationAccuracy } from '@awesome-cordova-plugins/location-accuracy/ngx';
import { LocationService } from './../../../../../shared/services/location.service';
import { AndroidPermissions } from '@awesome-cordova-plugins/android-permissions/ngx';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';

import { SharedModule } from 'src/app/shared/shared.module';
import { comingSoonComponent } from 'src/app/shared/modals/comingSoon/comingSoon.component';
@NgModule({
  imports: [





    CommonModule,
    FormsModule,
    AgmCoreModule.forRoot({
      // apiKey: 'AIzaSyDFhkX2pBymZ1cOIsWCPkE6F7hZ9ycF4Ds',
      apiKey: 'AIzaSyA2Xs1XgrxpKiilv6LxjOEi128JhkHB-do',
      libraries: ['places']
    }),
    IonicModule,
    CustomerLocationPageRoutingModule
  ],
  declarations: [CustomerLocationPage,comingSoonComponent],
  // providers: [autoLocationService, LocationAccuracy,Geolocation , LocationService, AndroidPermissions, Geolocation, NativeGeocoder]
})
export class CustomerLocationPageModule { }
