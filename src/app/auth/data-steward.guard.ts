import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  CanActivate,
} from "@angular/router";
import { UserHandlerService } from "../shared/user/user-handler.service";

@Injectable({
  providedIn: 'root'
})
export class DataStewardGuard implements CanActivate {
  private hasDataStewardAccess: boolean;

  constructor(
    private readonly userHandlerService: UserHandlerService,
    readonly router: Router
  ) {
    this.userHandlerService.userHasDataStewardRole$.subscribe(
      (x) => (this.hasDataStewardAccess = x)
    );
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    if (!this.hasDataStewardAccess)
      return this.router.createUrlTree(['/login']); // We should probably have an 'Unauthorized' page for this

    return true;
  }
}
