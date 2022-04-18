import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecomendedOilPage } from './recomended-oil.page';

const routes: Routes = [
  {
    path: '',
    component: RecomendedOilPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecomendedOilPageRoutingModule { }
