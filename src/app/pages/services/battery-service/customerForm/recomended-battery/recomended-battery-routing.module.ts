import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecomendedBatteryPage } from './recomended-battery.page';

const routes: Routes = [
  {
    path: '',
    component: RecomendedBatteryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecomendedBatteryPageRoutingModule {}
