// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import { WebStorageStateStore } from 'oidc-client';

export const environment = {
  production: false,
  base: 'https://localhost:5000',
  oidcSettings: {
    client_id : 'interactive.public',
    authority: 'https://demo.identityserver.io/',
    response_type: 'code',
    post_logout_redirect_uri: 'http://localhost:4200/',
    loadUserInfo: false,
    redirect_uri: 'http://localhost:4200/login',
    silent_redirect_uri: 'http://localhost:4200/login',
    automaticSilentRenew: true,
    scope: 'openid profile offline_access',
    userStore: new WebStorageStateStore({ store: window.localStorage })
  }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
