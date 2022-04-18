import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BatteryServicePage } from './battery-service.page';

const routes: Routes = [
  {
    path: '',
    component: BatteryServicePage
  },
  {
    path: 'customer-location',
    loadChildren: () => import('./customerForm/customer-location/customer-location.module').then(m => m.CustomerLocationPageModule)
  },
  {
    path: 'customer-vehicles',
    loadChildren: () => import('./customerForm/customer-vehicles/customer-vehicles.module').then(m => m.CustomerVehiclesPageModule)
  },
  {
    path: 'recomended-battery',
    loadChildren: () => import('./customerForm/recomended-battery/recomended-battery.module').then(m => m.RecomendedBatteryPageModule)
  },
  {
    path: 'recomended-tyre',
    loadChildren: () => import('./customerForm/recomended-tyre/recomended-tyre.module').then(m => m.RecomendedTyrePageModule)
  },
  {
    path: 'confirm-request',
    loadChildren: () => import('./customerForm/confirm-request/confirm-request.module').then(m => m.ConfirmRequestPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BatteryServicePageRoutingModule { }
