import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes, CanActivate } from '@angular/router';
import { authGuard } from './shared/auth/auth.guard';
const routes: Routes = [
  {
    path: '',
    redirectTo: '/services',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./users/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./users/signup/signup.module').then(m => m.SignupPageModule)
  },
  {
    path: 'forget-password',
    loadChildren: () => import('./users/forgetPassword/forgetPassword.module').then(m => m.ForgetPasswordPageModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardPageModule)
  },
  {
    path: 'services',
    loadChildren: () => import('./pages/services/services.module').then(m => m.ServicesPageModule)
  },
  {
    path: 'location',
    loadChildren: () => import('./pages/getMyLocation/getMyLocation-location.module').then(m => m.GetMyLocationPageModule)
  },
  {
    path: 'tracking/:id',
    loadChildren: () => import('./pages/tracking/tracking.module').then(m => m.TrackingPageModule)
  },
  {
    path: 'success',
    loadChildren: () => import('./pages/success/success.module').then(m => m.SuccessPageModule)
  },
  {
    path: 'my-order',
    loadChildren: () => import('./pages/orders/my-order/my-order.module').then(m => m.MyOrderPageModule),
    canActivate: [authGuard]
  },
  {
    path: 'terms',
    loadChildren: () => import('./pages/terms/terms.module').then(m => m.TermsPageModule)
  },
  {
    path: 'contact',
    loadChildren: () => import('./pages/contact/contact.module').then(m => m.ContactPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.module').then(m => m.ProfilePageModule)
  },
  {
    path: 'vehicles',
    loadChildren: () => import('./pages/vehicles/vehicles.module').then(m => m.VehiclesPageModule),
    canActivate: [authGuard]
  },
  {
    path: 'locations',
    loadChildren: () => import('./pages/locations/locations.module').then(m => m.LocationsPageModule),
    canActivate: [authGuard]
  },
  {
    path: 'order-detail/:id',
    loadChildren: () => import('./pages/orders/order-detail/order-detail.module').then(m => m.OrderDetailPageModule),
    canActivate: [authGuard]
  },


];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule],
  providers: [authGuard],
})
export class AppRoutingModule { }
