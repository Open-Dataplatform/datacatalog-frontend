import { TestBed, inject } from '@angular/core/testing';
import { UserHandlerService } from './user-handler.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import { UserManager, User, UserSettings } from 'oidc-client';
import {SharedModule} from "../../shared/shared.module";
import * as environment from 'src/environments/environment';
import { filter } from 'rxjs/operators';
import { of } from 'rxjs';

const testEnvironment = {
  oidcSettings: {
    client_id : '8cdf0892-b169-47e4-baa2-03a118a61804',
    authority: 'https://authority',
    response_type: 'code',
    post_logout_redirect_uri: 'http://postlogout',
    loadUserInfo: false,
    redirect_uri: 'http://redirect',
    silent_redirect_uri: 'http://silentredirect',
    automaticSilentRenew: true,
    scope: 'test scope',
  }
};

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

describe('UserHandlerService', async () => {
  let userManagerMock: UserManager;
  
  beforeEach(async () => { 
    userManagerMock = new UserManager(testEnvironment.oidcSettings);
    TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule,
      SharedModule
    ]}).overrideProvider(UserManager, {useValue: userManagerMock});
  });

  it('should be created', async () => {
    const service: UserHandlerService = TestBed.get(UserHandlerService);
    expect(service).toBeTruthy();
  });

  it('should return relevant user on getUser', async () => {
    // Arrange
    const mockUser = new User(mockUserSettings);
    const sut: UserHandlerService = TestBed.get(UserHandlerService);
    spyOn(userManagerMock, 'getUser').and.returnValue(Promise.resolve(mockUser));

    // Act
    const user = await sut.getUser();

    // Assert
    expect(userManagerMock.getUser).toHaveBeenCalled();
    expect(user).toBe(mockUser);
  });

  it('should signin after redirect when calling loadUser', async () => {
    // Arrange
    const mockUser = new User(mockUserSettings);
    const sut: UserHandlerService = TestBed.get(UserHandlerService);
    spyOn(userManagerMock, 'signinRedirectCallback').and.returnValue(Promise.resolve(mockUser));

    // Act 
    await sut.loadUser();

    // Assert
    expect(userManagerMock.signinRedirectCallback).toHaveBeenCalled();
  });

  it('should redirect to signin page when calling login', async () => {
    // Arrange
    const sut: UserHandlerService = TestBed.get(UserHandlerService);
    spyOn(userManagerMock, 'signinRedirect').and.returnValue(Promise.resolve());

    // Act 
    await sut.login();

    // Assert
    expect(userManagerMock.signinRedirect).toHaveBeenCalled();
  });

  it('should cleanup session on logout', async (done) => {
    // Arrange
    const sut: UserHandlerService = TestBed.get(UserHandlerService);
    sut.userLoggedIn$.subscribe(user => {expect(user).toBe(null); done();})
    spyOn(userManagerMock, 'signoutRedirect').and.returnValue(Promise.resolve());
    spyOn(userManagerMock, 'clearStaleState').and.returnValue(Promise.resolve());
    spyOn(userManagerMock, 'removeUser').and.returnValue(Promise.resolve());

    // Act 
    await sut.logout();

    // Assert
    expect(userManagerMock.signoutRedirect).toHaveBeenCalled();
    expect(userManagerMock.clearStaleState).toHaveBeenCalled();
    expect(userManagerMock.removeUser).toHaveBeenCalled();
  });

  it('should subscribe to relevant events', () => {
    // Arrange
    spyOn(userManagerMock.events, 'addUserLoaded');
    spyOn(userManagerMock.events, 'addSilentRenewError');
    spyOn(userManagerMock.events, 'addUserSignedOut');
    spyOn(userManagerMock.events, 'addUserUnloaded');
    const sut: UserHandlerService = TestBed.get(UserHandlerService);
    
    // Act 
    sut.instantiate();

    // Assert
    expect(userManagerMock.events.addUserLoaded).toHaveBeenCalled();
    expect(userManagerMock.events.addSilentRenewError).toHaveBeenCalled();
    expect(userManagerMock.events.addUserSignedOut).toHaveBeenCalled();
    expect(userManagerMock.events.addUserUnloaded).toHaveBeenCalled();
  });

  it('should emit the logged in after user load event was received', (done) => {
    // Arrange
    const mockUser = new User(mockUserSettings);
    const sut: UserHandlerService = TestBed.get(UserHandlerService);
    sut.instantiate();
    sut.userLoggedIn$.pipe(filter(user => user !== null)).subscribe(user => {expect(user).toBe(mockUser); done();});

    // Act 
    userManagerMock.events.load(mockUser);
  });

  it('should load user info after user load event was received', () => {
    // Arrange
    const mockUser = new User(mockUserSettings);
    const sut: UserHandlerService = TestBed.get(UserHandlerService);
    sut.instantiate();
    spyOn(sut, 'getUserInfo').and.returnValue(of());

    // Act 
    userManagerMock.events.load(mockUser);

    // Assert
    expect(sut.getUserInfo).toHaveBeenCalledTimes(1);
  });

  it('should emit null user when user unload event is received', async (done) => {
    // Arrange
    const sut: UserHandlerService = TestBed.get(UserHandlerService);
    sut.userLoggedIn$.subscribe((user) => {expect(user).toBe(null); done();});

    // Act 
    await userManagerMock.events.unload();
  });

  it('should get user on initialize', async () => {
    // Arrange
    const sut: UserHandlerService = TestBed.get(UserHandlerService);
    const mockUser = new User(mockUserSettings);
    spyOnProperty(mockUser, 'expired').and.returnValue(false);
    spyOn(userManagerMock, 'getUser').and.returnValue(Promise.resolve(mockUser));
    spyOn(sut, 'getUserInfo').and.returnValue(of());

    // Act 
    await sut.initialize();

    // Assert
    expect(userManagerMock.getUser).toHaveBeenCalledTimes(1);
  });

  it('should sign in silent on initialize if user is not null and user is expired', async () => {
    // Arrange
    const sut: UserHandlerService = TestBed.get(UserHandlerService);
    const mockUser = new User(mockUserSettings);
    spyOnProperty(mockUser, 'expired').and.returnValue(true);
    spyOn(userManagerMock, 'getUser').and.returnValue(Promise.resolve(mockUser));
    spyOn(userManagerMock, 'signinSilent').and.returnValue(Promise.resolve(null));

    // Act 
    await sut.initialize();

    // Assert
    expect(userManagerMock.signinSilent).toHaveBeenCalledTimes(1);
  });

  it('should get user info on initialize if logged in user is not null and not expired', async () => {
    // Arrange
    const sut: UserHandlerService = TestBed.get(UserHandlerService);
    const mockUser = new User(mockUserSettings);
    spyOnProperty(mockUser, 'expired').and.returnValue(false);
    spyOn(userManagerMock, 'getUser').and.returnValue(Promise.resolve(mockUser));
    spyOn(sut, 'getUserInfo').and.returnValue(of());

    // Act 
    await sut.initialize();

    // Assert
    expect(sut.getUserInfo).toHaveBeenCalledTimes(1);
  });

  it('should emit logged in user event on initialize when the user is logged in and user info is received', async (done) => {
    // Arrange
    const sut: UserHandlerService = TestBed.get(UserHandlerService);
    const mockUser = new User(mockUserSettings);
    spyOnProperty(mockUser, 'expired').and.returnValue(false);
    spyOn(userManagerMock, 'getUser').and.returnValue(Promise.resolve(mockUser));
    spyOn(sut, 'getUserInfo').and.returnValue(of());
    sut.userLoggedIn$.pipe(filter(user => user !== null)).subscribe(user => {expect(user).toBe(mockUser); done();});

    // Act 
    await sut.initialize();
  });

  it ('should emit false when user is not DataSteward on getUserInfo', 
  inject([HttpTestingController], (httpMock: HttpTestingController)  => {
    // Arrange
    const sut: UserHandlerService = TestBed.get(UserHandlerService);
    environment.environment.base = "http://localhost:5000";

    // Act
    sut.getUserInfo().subscribe();  
    
    // Assert
    const req = httpMock.expectOne("http://localhost:5000/api/user");
    req.flush(
      {
        name: 'UserName',
        roles: [
          'Admin'
        ]
      }
    );
    sut.userHasDataStewardRole$.subscribe(b => expect(b).toBe(false));
  })
);

  it ('should emit true when user is DataSteward on getUserInfo', 
      inject([HttpTestingController], (httpMock: HttpTestingController)  => {
        // Arrange
        const sut: UserHandlerService = TestBed.get(UserHandlerService);
        environment.environment.base = "http://localhost:5000";

        // Act
        sut.getUserInfo().subscribe();

        // Assert
        const req = httpMock.expectOne("http://localhost:5000/api/user");
        req.flush(
          {
            name: 'UserName',
            roles: [
              'DataSteward'
            ]
          }
        );
        sut.userHasDataStewardRole$.subscribe(b => expect(b).toBe(true) );
      })
  );
});
