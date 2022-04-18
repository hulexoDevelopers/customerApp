import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ServicesPage } from './services.page';

const routes: Routes = [
  {
    path: '',
    component: ServicesPage
  },

  // {
  //   path: 'battery-services',
  //   loadChildren: () => import('./battery-service/battery-service.module').then(m => m.BatteryServicePageModule)
  // },
  {
    path: 'other-services',
    loadChildren: () => import('./otherService/otherService.module').then(m => m.OtherServicesPageModule)
  },
  {
    path: 'customer-location',
    loadChildren: () => import('./battery-service/customerForm/customer-location/customer-location.module').then(m => m.CustomerLocationPageModule)
  },
  {
    path: 'customer-vehicles',
    loadChildren: () => import('./battery-service/customerForm/customer-vehicles/customer-vehicles.module').then(m => m.CustomerVehiclesPageModule)
  },
  {
    path: 'recomended-battery',
    loadChildren: () => import('./battery-service/customerForm/recomended-battery/recomended-battery.module').then(m => m.RecomendedBatteryPageModule)
  },
  {
    path: 'recomended-tyre',
    loadChildren: () => import('./battery-service/customerForm/recomended-tyre/recomended-tyre.module').then(m => m.RecomendedTyrePageModule)
  },
  {
    path: 'recomended-oil',
    loadChildren: () => import('./battery-service/customerForm/recomended-oil/recomended-oil.module').then(m => m.RecomendedOilPageModule)
  },
  {
    path: 'confirm-request',
    loadChildren: () => import('./battery-service/customerForm/confirm-request/confirm-request.module').then(m => m.ConfirmRequestPageModule)
  },
  // {
  //   path: 'customer-location',
  //   loadChildren: () => import('./customer/customer-location/customer-location.module').then( m => m.CustomerLocationPageModule)
  // },
  // {
  //   path: 'customer-vehicles',
  //   loadChildren: () => import('./customer/customer-vehicles/customer-vehicles.module').then( m => m.CustomerVehiclesPageModule)
  // },
  // {
  //   path: 'recomended-battery',
  //   loadChildren: () => import('./customer/recomended-battery/recomended-battery.module').then( m => m.RecomendedBatteryPageModule)
  // },
  // {
  //   path: 'confirm-request',
  //   loadChildren: () => import('./customer/confirm-request/confirm-request.module').then( m => m.ConfirmRequestPageModule)
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServicesPageRoutingModule { }
