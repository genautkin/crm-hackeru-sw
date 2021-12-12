import { Component, OnInit } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private loginService: AuthService,private deviceService: DeviceDetectorService) { }
  isMobile = this.deviceService.isMobile();
  sidebarToggle = true;

  ngOnInit(): void {
    console.log(this.loginService.user)
  }
  
  getUserName(): string {
    return this.loginService.user.displayName ? this.loginService.user.displayName : this.loginService.user.email
  }

  logOut(){
    this.loginService.logout()
  }
}
