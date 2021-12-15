import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { IfUserLogin } from './services/userLoginGuard';
import { SpinnerComponent } from './tools/spinner/spinner.component';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../environments/environment';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { UsersComponent } from './dashboard/users/users.component';
import { CustomersComponent } from './dashboard/customers/customers.component';
import { ShowCustomersComponent } from './dashboard/show-customers/show-customers.component';
import { MyPipePipe } from './pipes/my-pipe.pipe';
import { RegUserComponent } from './auth/reg-user/reg-user.component';
import { MainComponent } from './dashboard/main/main.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    SpinnerComponent,
    UsersComponent,
    CustomersComponent,
    ShowCustomersComponent,
    MyPipePipe,
    RegUserComponent,
    MainComponent
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    AngularFireAuthModule,
    SweetAlert2Module.forRoot()
  ],
  providers: [IfUserLogin],
  bootstrap: [AppComponent]
})
export class AppModule { }
