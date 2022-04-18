import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustomerVehiclesPage } from './customer-vehicles.page';

const routes: Routes = [
  {
    path: '',
    component: CustomerVehiclesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerVehiclesPageRoutingModule {}
