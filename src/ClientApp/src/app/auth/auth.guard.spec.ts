import { TestBed, inject, waitForAsync } from '@angular/core/testing';
import { User, UserSettings } from 'oidc-client';
import { AuthGuard } from './auth.guard';
import {SharedModule} from "../shared/shared.module";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";
import { UrlTree } from '@angular/router';

const mockUserSettings: UserSettings = {
  id_token: "",
  session_state: "string",
  access_token: "string",
  refresh_token: "string",
  token_type: "string",
  scope: "string",
  profile: null,
  expires_at: 12345,
  state: "test state"
}

describe('AuthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([
          {
            path: 'login',
            loadChildren: () => import('../pages/login-page/login-page.module').then(m => m.LoginPageModule),
          }
        ])
      ],
      providers: [AuthGuard]
    });
  });

  it('should init auth guard', inject([AuthGuard], (guard: AuthGuard) => {
    expect(guard).toBeTruthy();
  }));

  it('let user through', inject([AuthGuard], (guard: AuthGuard) => {
    // @ts-ignore
    spyOn(guard.userHandlerService, 'userHasDataStewardRole').and.returnValue(true);
    expect(guard.checkLogin()).toBeTruthy();
  }));

  it('should not let user through', inject([AuthGuard], (guard: AuthGuard) => {
    // @ts-ignore
    spyOn(guard.userHandlerService, 'userHasDataStewardRole').and.returnValue(false);
    return guard.checkLogin().then((result: UrlTree) => expect(result.toString()).toBe('/login'));
  }));

  it('checkLogin should return true if user session is not expired', inject([AuthGuard], async (guard: AuthGuard) => {
    // Arrange
    const mockUser = new User(mockUserSettings);
    
    spyOnProperty(mockUser, 'expired').and.returnValue(false);
    
    // @ts-ignore
    spyOn(guard.userHandlerService, 'getUser').and.returnValue(Promise.resolve(mockUser));

    // Act
    const result = await guard.checkLogin(true);

    // Assert
    expect(result).toBe(true);
  }));

  it('checkLogin should return to login page if user session is expired', inject([AuthGuard], async (guard: AuthGuard) => {
    // Arrange
    const mockUser = new User(mockUserSettings);
    spyOnProperty(mockUser, 'expired').and.returnValue(true);
    
    // @ts-ignore
    spyOn(guard.userHandlerService, 'getUser').and.returnValue(Promise.resolve(mockUser));

    // Act / Assert
    const result = await guard.checkLogin(true);

    // Assert
    expect(result.toString()).toBe('/login');
    // @ts-ignore
    expect(guard.userHandlerService.getUser).toHaveBeenCalledTimes(1);
  }));
});
