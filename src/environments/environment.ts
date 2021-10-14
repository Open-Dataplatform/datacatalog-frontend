// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
export const environment = Object.assign({
  production: false,
  base: 'https://localhost:5000',
  egressBase: 'https://localhost:5000/osiris-egress/v1',
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
  },
  oboOidcSettings: {
    client_id : 'd9cd520e-2317-4db6-a5ae-77f0949085af',
    authority: 'https://login.microsoftonline.com/f7619355-6c67-4100-9a78-1847f30742e2/v2.0/',
    response_type: 'code',
    loadUserInfo: false,
    automaticSilentRenew: true,
    popup_redirect_uri: 'http://localhost:4200/obo-login',
    scope: 'https://storage.azure.com/user_impersonation',
  }
},
  (window as any).dynamicEnvironment);

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
