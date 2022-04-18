import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GetMyLocationLocationPage } from './getMyLocation-location.page';

const routes: Routes = [
  {
    path: '',
    component: GetMyLocationLocationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GetMyLocationPageRoutingModule {}
