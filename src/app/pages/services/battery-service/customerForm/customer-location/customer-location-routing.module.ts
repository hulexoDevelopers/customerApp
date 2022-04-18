import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustomerLocationPage } from './customer-location.page';

const routes: Routes = [
  {
    path: '',
    component: CustomerLocationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerLocationPageRoutingModule {}
