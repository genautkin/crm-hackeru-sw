import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { CustomersComponent } from './dashboard/customers/customers.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { IfUserLogin } from './services/userLoginGuard';

const routes: Routes = [
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  {path: 'dashboard', component: DashboardComponent,canActivate: [IfUserLogin],
  children: [
    {
      path: 'customers', // child route path
      component: CustomersComponent, // child route component that the router renders
    }]},
  {path: 'login', component: LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
