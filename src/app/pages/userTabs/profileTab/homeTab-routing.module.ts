import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeTabPage } from './homeTab.page';

const routes: Routes = [
  {
    path: '',
    component: HomeTabPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeTabPageRoutingModule {}
