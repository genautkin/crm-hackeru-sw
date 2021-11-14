import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SpinnerService } from './spiner.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private spinnerService: SpinnerService,
    private router: Router, private route: ActivatedRoute
  ) { }

  user?:string;

  loginWithEmailPassword(email: string, password: string):Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.spinnerService.setStatus(true);
      setTimeout(() => {
        this.spinnerService.setStatus(false);
        this.user = 'dsdds'
        this.router.navigate(['dashboard'], { relativeTo: this.route });

      }, 4000);
    })
  }
}
