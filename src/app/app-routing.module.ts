import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegUserComponent } from './auth/reg-user/reg-user.component';
import { CustomersComponent } from './dashboard/customers/customers.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MainComponent } from './dashboard/main/main.component';
import { ShowCustomersComponent } from './dashboard/show-customers/show-customers.component';
import { IfUserLogin } from './services/userLoginGuard';

const routes: Routes = [
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  {path: 'dashboard', component: DashboardComponent,canActivate: [IfUserLogin],
  children: [
    {
      path: '', // child route path
      component: MainComponent, // child route component that the router renders
    },
    {
      path: 'customer', // child route path
      component: CustomersComponent, // child route component that the router renders
    },
    {
      path: 'customers', // child route path
      component: ShowCustomersComponent, // child route component that the router renders
    },
    {
      path: 'customers/:id', // child route path
      component: CustomersComponent, // child route component that the router renders
    }]},
  {path: 'login', component: LoginComponent},
  {path: 'createAccount', component: RegUserComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
