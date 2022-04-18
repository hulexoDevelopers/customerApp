import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HomeTabPage } from './homeTab.page';
import { HomeTabPageRoutingModule } from './homeTab-routing.module';
// import { VideoPlayer } from '@ionic-native/video-player/ngx';
import { LazyLoadImageModule } from 'ng-lazyload-image';
@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    LazyLoadImageModule,
    FormsModule,
    HomeTabPageRoutingModule
  ],
  providers: [
    // VideoPlayer,
  ],
  declarations: [HomeTabPage]
})
export class HomeTabPageModule { }
