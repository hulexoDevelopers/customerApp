import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConfirmRequestPage } from './confirm-request.page';

const routes: Routes = [
  {
    path: '',
    component: ConfirmRequestPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfirmRequestPageRoutingModule {}
