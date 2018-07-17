import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './pages/login/login.component';
import { MainComponent } from './main/main.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PolicyDetailComponent } from './pages/policy-detail/policy-detail.component';
import { NewPolicyComponent } from './pages/new-policy/new-policy.component';
import { NewCustomerComponent } from './pages/new-customer/new-customer.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    component: MainComponent,
    children: [
      {
        component: DashboardComponent,
        path: 'dashboard'
      },
      {
        path: 'policyDetail',
        component: PolicyDetailComponent
      },
      {
        path: 'newPolicy',
        component: NewPolicyComponent
      },
      {
        path: 'newCustomer',
        component: NewCustomerComponent
      }
    ]},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { useHash: true }),
  ],
  exports: [
    RouterModule,
  ]
})
export class AppRoutingModule { }
export const routedComponents: any[] = [ LoginComponent, MainComponent, DashboardComponent, PolicyDetailComponent, NewPolicyComponent, 
  NewCustomerComponent];
