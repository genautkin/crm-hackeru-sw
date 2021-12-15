import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../modules/user.module';
import { AlertService } from './alert.service';
import { HelperServiceService } from './helper-service.service';
import { SpinnerService } from './spiner.service';
import firebase from 'firebase/compat/app';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private spinnerService: SpinnerService,
    private router: Router, private route: ActivatedRoute,
    public auth: AngularFireAuth, public alertService: AlertService,private helper:HelperServiceService
  ) { }
    user?:any

  loginWithEmailPassword(email: string, password: string) {
    this.spinnerService.setStatus(true);
    this.auth.signInWithEmailAndPassword(email, password).then((data)=>{
      this.spinnerService.setStatus(false);
      this.router.navigate(['dashboard'], { relativeTo: this.route });
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      this.alertService.error('', errorMessage);
      this.spinnerService.setStatus(false);
    });
  }


  createUserWithEmailAndPassword(email: string, password: string,  user:User) {
    this.spinnerService.setStatus(true);
    this.auth.createUserWithEmailAndPassword(email, password).then((userData)=>{
      this.helper.saveUser(userData.user!.uid,user)
      this.spinnerService.setStatus(false);
      this.router.navigate(['dashboard'], { relativeTo: this.route });
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      this.alertService.error('', errorMessage);
      this.spinnerService.setStatus(false);
    });
  }

  isUserLoggedIn():Promise<boolean> {
    return new Promise((resolve, reject)=>{
      if (this.user) {
        resolve(true);
        
      }
      this.auth.authState.subscribe(res => {
        if (res && res.uid) {
          this.user = res;
          resolve(true);
        } else {
          this.router.navigate(['login'], { relativeTo: this.route });
        }
      });
    })
  }

  logout(){
    this.auth.signOut();
  }

  getUserUid():string {
    return this.user.uid
  }

  // Sign in with Google
  GoogleAuth() {
    return this.AuthLogin(new firebase.auth.GoogleAuthProvider());
  }  

  // Auth logic to run auth providers
  AuthLogin(provider:firebase.auth.AuthProvider) {
    return this.auth.signInWithPopup(provider)
    .then((result) => {
        console.log('You have been successfully logged in!')
        this.router.navigate(['dashboard'], { relativeTo: this.route });
    }).catch((error) => {
      this.alertService.error('', error);
    })
  }
}
