(function (window) {
  window.dynamicEnvironment = {
    // Helm will inject a similar file to this for the environment it's running in.
    // This is needed since angular is statically served, and will not read environment variables at runtime,
    // thus we need this dynamic file which is loaded upon initializing the page.
    /*
    base: 'https://localhost:5000',
    production: false,
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
      popup_redirect_uri: 'http://localhost:4200/obo-login',
      scope: 'https://storage.azure.com/user_impersonation',
    }
     */
  };
}(this));
