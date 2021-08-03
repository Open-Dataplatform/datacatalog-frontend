import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserManager, User } from 'oidc-client';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IUser, UserClient } from '../api/api';

@Injectable({
  providedIn: 'root'
})
export class UserHandlerService {
  private userLoggedIn = new BehaviorSubject<User>(null);
  public userLoggedIn$ = this.userLoggedIn.asObservable();
  public userHasDataStewardRole = new BehaviorSubject<boolean>(false);
  public userHasDataStewardRole$ = this.userHasDataStewardRole.asObservable();

  constructor(
    private readonly userClient: UserClient,
    private readonly userManager: UserManager) {
  }

  public async initialize(): Promise<void> {
    this.instantiate();

    const loggedInUser = await this.userManager.getUser();

    if (loggedInUser && loggedInUser.expired) {
      await this.userManager.signinSilent().catch(error => console.error('Error received when refreshing token: ' + error));
    }

    if (loggedInUser && !loggedInUser.expired) {
      await this.getUserInfo().toPromise();
      this.userLoggedIn.next(loggedInUser);
    }
  }

  public getUser(): Promise<User> {
    return this.userManager.getUser();
  }

  async loadUser(): Promise<void> {
    await this.userManager.signinRedirectCallback();
  }

  public login(): Promise<void> {
    return this.userManager.signinRedirect();
  }

  async logout(): Promise<void> {
    await this.userManager.signoutRedirect();
    await this.userManager.clearStaleState();
    await this.userManager.removeUser();
    this.userLoggedIn.next(null);
  }

  getUserInfo(): Observable<void> {

    return this.userClient.getUserInfo()
                  .pipe(
                    map(user => this.userHasDataStewardRole.next(user.roles.indexOf('DataSteward') > -1))
                  );
  }

  public instantiate() {
    this.userManager.events.addUserLoaded((user) => { this.getUserInfo().subscribe(); this.userLoggedIn.next(user); });
    this.userManager.events.addSilentRenewError(() => this.logout());
    this.userManager.events.addUserSignedOut(() => this.userLoggedIn.next(null));
    this.userManager.events.addUserUnloaded(() => this.userLoggedIn.next(null));
  }
}
