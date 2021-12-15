import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private auth: AuthService) { }

  form = {
    email:'',
    password:''
  }

  ngOnInit(): void {
  
    
  }

  login(){
    this.auth.loginWithEmailPassword(this.form.email,this.form.password)

  }

  logInWithProvider(name:string) {
    switch (name) {
      case 'google':
        this.auth.GoogleAuth();
        break;
    
      default:
        break;
    }
  }

}
