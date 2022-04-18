import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OtherServicesPage } from './otherService.page';

const routes: Routes = [
  {
    path: '',
    component: OtherServicesPage
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OtherServicesPageRoutingModule { }
