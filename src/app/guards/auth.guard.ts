import { Injectable } from '@angular/core';
import { CanActivateFn, CanActivate, ActivatedRouteSnapshot, GuardResult, MaybeAsync, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable(
  {providedIn:'root'}
)

export class AuthGuard implements CanActivate {
  constructor(private autthService: AuthService, private router:Router) { }
  canActivate(): boolean {
    if (this.autthService.getUser()){
      return true;
    }else{
      this.router.navigate(['/auth']);
      return false;
    }
  }
  
};
