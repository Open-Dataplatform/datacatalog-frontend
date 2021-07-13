(function (window) {
  window.dynamicEnvironment = {
    // Helm will inject a similar file to this for the environment it's running in.
    // This is needed since angular is statically served, and will not read environment variables at runtime,
    // thus we need this dynamic file which is loaded upon initializing the page.
    /*
    basehref: '/',
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
    }
     */
  };
}(this));
