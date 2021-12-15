import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/modules/user.module';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-reg-user',
  templateUrl: './reg-user.component.html',
  styleUrls: ['./reg-user.component.css']
})
export class RegUserComponent implements OnInit {

  constructor( private authService: AuthService, private alertService: AlertService) { }
  form = {
    firstName:'',
    lastName:'',
    email:'',
    password:'',
    repeatPassword:''
  }


  ngOnInit(): void {
  }

  onSubmit(f:NgForm){
    const user = f.form.value;
    if (user.password === user.repeatPassword) {

      this.authService.createUserWithEmailAndPassword(user.email, user.password, new User(user.firstName, user.lastName, user.email))
    }
    else {
      this.alertService.error("The password you entered is incorrect","")
    }
  }

}
