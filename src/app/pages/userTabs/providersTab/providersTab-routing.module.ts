import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProvidersTabPage } from './providersTab.page';

const routes: Routes = [
  {
    path: '',
    component: ProvidersTabPage,

  },
  {
    path: 'provider-detail/:providerId',
    loadChildren: () => import('./provider-detail/provider-detail.module').then( m => m.ProviderDetailPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProvidersTabPageRoutingModule { }
