import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  CanActivateChild,
  Router,
  CanActivate
} from '@angular/router';
import {  Observable } from 'rxjs';
import { UserHandlerService } from "../shared/user/user-handler.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {

  private hasDataStewardAccess: boolean;

  constructor(private readonly userHandlerService: UserHandlerService,  readonly router: Router) 
  {
      this.userHandlerService.userHasDataStewardRole$.subscribe(
        x => this.hasDataStewardAccess = x
      );
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot,
                   state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // Used in datasteward pages that need steward access.
    return this.checkLogin();
  }

  canActivate(childRoute: ActivatedRouteSnapshot,
                   state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // Used for user pages, without steward access.
    return this.checkLogin(true);
  }

  async checkLogin(unsecure: boolean = false): Promise<boolean | UrlTree> {
    var currentUser = await this.userHandlerService.getUser();

    if (currentUser && !currentUser.expired && (this.hasDataStewardAccess || unsecure)) {
      return true;
    }
    
    return this.router.createUrlTree(['/login']);
  }
}