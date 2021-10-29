import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';
import { SessionService } from './session.service';


@Injectable({
  providedIn: 'root'
})
export class IsLoginGuard implements CanActivate {

  constructor(
    private sessionService: SessionService,
    private routerService: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    const hasSession = this.sessionService.getsession();

    if (hasSession) {
      this.routerService.navigate(['notes'])
      return false
    }

    return true
  }

}
