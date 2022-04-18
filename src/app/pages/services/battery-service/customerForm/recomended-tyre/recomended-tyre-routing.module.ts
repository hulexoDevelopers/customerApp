import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecomendedTyrePage } from './recomended-tyre.page';

const routes: Routes = [
  {
    path: '',
    component: RecomendedTyrePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecomendedTyrePageRoutingModule { }
