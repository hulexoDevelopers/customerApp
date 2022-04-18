import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { locationsPage } from './locations.page';

const routes: Routes = [
  {
    path: '',
    component: locationsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LocationsPageRoutingModule { }
