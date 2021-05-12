// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import { WebStorageStateStore } from 'oidc-client';

export const environment = {
  production: false,
  //base: 'https://dpdatacatalogwebapi-appservice-awo.azurewebsites.net',
  base: 'https://localhost:5000',
  elk: 'http://10.0.6.4:9200/datacatalog.web-xnikh',
  oidcSettings: {
    client_id : '8cdf0892-b169-47e4-baa2-03a118a61804',
    authority: 'https://login.microsoftonline.com/f7619355-6c67-4100-9a78-1847f30742e2/v2.0/',
    response_type: 'code',
    post_logout_redirect_uri: 'http://localhost:4200/',
    loadUserInfo: false,
    redirect_uri: 'http://localhost:4200/login',
    silent_redirect_uri: 'http://localhost:4200/login',
    automaticSilentRenew: true,
    scope: 'api://8cdf0892-b169-47e4-baa2-03a118a61804/user_impersonation openid profile offline_access',
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
