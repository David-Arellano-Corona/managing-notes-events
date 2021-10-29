import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Router } from '@angular/router';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root'
})
export class HasSessionGuard implements CanActivate {
  
  constructor(
    private sessionService: SessionService,
    private routerService: Router
  ){}
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    const hasSession = this.sessionService.getsession();
    
    if(!hasSession){
      this.routerService.navigate(['signin'])
      return false
    }

    return true
  }
  
}
