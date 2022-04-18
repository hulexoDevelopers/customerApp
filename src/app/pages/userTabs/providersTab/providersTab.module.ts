import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProvidersTabPage } from './providersTab.page';
// import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { ProvidersTabPageRoutingModule } from './providersTab-routing.module';
import { providerFiltersComponent } from 'src/app/shared/modals/provider-filters/provider-filters.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    LazyLoadImageModule,
    FormsModule,
    ProvidersTabPageRoutingModule,
  ],
  declarations: [ProvidersTabPage,providerFiltersComponent]
})
export class ProvidersTabPageModule {}
