import { Injectable } from "@angular/core";
import { ActivatedRoute, CanActivate, Router } from "@angular/router";
import { AuthService } from "./auth.service";

@Injectable()
export class IfUserLogin implements CanActivate {
  constructor(private authService: AuthService,
    private router: Router, private route: ActivatedRoute) {}


  async canActivate(
  ): Promise<boolean>{
     const result = await this.authService.isUserLoggedIn()
     return result; 
   
  }
}