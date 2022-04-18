import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ServicesPageRoutingModule } from './services-routing.module';

import { ServicesPage } from './services.page';
import { autoLocationService } from 'src/app/shared/services/autoLocation.service';
import { LocationAccuracy } from '@awesome-cordova-plugins/location-accuracy/ngx';
import { LocationService } from './../../shared/services/location.service';
import { AndroidPermissions } from '@awesome-cordova-plugins/android-permissions/ngx';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';
import { AgmCoreModule } from '@agm/core';
import { callContactComponent } from 'src/app/shared/modals/contact/contact.component';
import { batteryServiceInfoComponent } from 'src/app/shared/modals/serviceInfo/bateryServiceInfo/batteryServiceInfo.component';
import { oilServiceInfoComponent } from 'src/app/shared/modals/serviceInfo/oilServiceInfo/oilServiceInfo.component';
import { tyreServiceInfoComponent } from 'src/app/shared/modals/serviceInfo/tyreServiceInfo/tyreServiceInfo.component';
import { washServiceInfoComponent } from 'src/app/shared/modals/serviceInfo/washServiceInfo/washServiceInfo.component';

@NgModule({
  imports: [
    CommonModule,
    AgmCoreModule.forRoot({
      // apiKey: 'AIzaSyDFhkX2pBymZ1cOIsWCPkE6F7hZ9ycF4Ds',
      apiKey: 'AIzaSyA2Xs1XgrxpKiilv6LxjOEi128JhkHB-do',
      libraries: ['places']
    }),
    FormsModule,
    IonicModule,
    ServicesPageRoutingModule
  ],
  declarations: [ServicesPage,callContactComponent,batteryServiceInfoComponent,oilServiceInfoComponent,tyreServiceInfoComponent,washServiceInfoComponent],
  providers: []
})
export class ServicesPageModule { }
