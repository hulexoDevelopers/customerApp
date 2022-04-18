import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GetMyLocationPageRoutingModule } from './getMyLocation-location-routing.module';

import { GetMyLocationLocationPage } from './getMyLocation-location.page';
import { NewAddressComponent } from './../../shared/modals/new-address/new-address.component';
import { AgmCoreModule } from '@agm/core';

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
    GetMyLocationPageRoutingModule
  ],
  declarations: [GetMyLocationLocationPage, NewAddressComponent],
  // providers: [autoLocationService, LocationAccuracy,Geolocation , LocationService, AndroidPermissions, Geolocation, NativeGeocoder]
})
export class GetMyLocationPageModule { }
