import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProviderDetailPage } from './provider-detail.page';

const routes: Routes = [
  {
    path: '',
    component: ProviderDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProviderDetailPageRoutingModule {}
