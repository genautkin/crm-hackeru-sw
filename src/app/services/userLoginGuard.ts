import { Injectable } from "@angular/core";
import { ActivatedRoute, CanActivate, Router } from "@angular/router";
import { AuthService } from "./auth.service";

@Injectable()
export class IfUserLogin implements CanActivate {
  constructor(private authService: AuthService,
    private router: Router, private route: ActivatedRoute) {}


  canActivate(
  ): boolean{
      if (this.authService.user) {
        return true
      }
      this.router.navigate(['login'], { relativeTo: this.route });
      return false;
   
  }
}